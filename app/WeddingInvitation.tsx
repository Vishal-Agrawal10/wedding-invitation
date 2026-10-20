"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  CalendarDays,
  ChevronDown,
  Clock3,
  ExternalLink,
  Heart,
  Image as ImageIcon,
  MapPin,
  Menu,
  MessageCircleHeart,
  Music2,
  Pause,
  Play,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { weddingConfig as config } from "./wedding.config";

const navItems = [
  ["Story", "story"],
  ["Events", "events"],
  ["Gallery", "gallery"],
  ["Venue", "venue"],
  ["RSVP", "rsvp"],
] as const;

function calculateTimeLeft(target: string) {
  const difference = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
}

function SectionHeading({
  eyebrow,
  title,
  light = false,
}: {
  eyebrow: string;
  title: string;
  light?: boolean;
}) {
  return (
    <motion.div
      className={`section-heading ${light ? "section-heading--light" : ""}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75 }}
    >
      <span className="eyebrow"><Sparkles size={13} /> {eyebrow}</span>
      <h2>{title}</h2>
      <div className="heading-flourish"><i /><b>◆</b><i /></div>
    </motion.div>
  );
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const firstTick = window.setTimeout(
      () => setTimeLeft(calculateTimeLeft(config.wedding.date)),
      0,
    );
    const timer = window.setInterval(
      () => setTimeLeft(calculateTimeLeft(config.wedding.date)),
      1000,
    );
    return () => {
      window.clearTimeout(firstTick);
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className="countdown" aria-label="Countdown to the wedding">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div className="countdown__item" key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export function WeddingInvitation() {
  const [entered, setEntered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const ambienceRef = useRef<{ gain: GainNode; oscillators: OscillatorNode[] } | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, 110]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.35]);

  const stopAmbience = () => {
    audioRef.current?.pause();
    if (ambienceRef.current) {
      ambienceRef.current.gain.gain.cancelScheduledValues(0);
      ambienceRef.current.gain.gain.setTargetAtTime(0, audioContextRef.current?.currentTime ?? 0, 0.08);
    }
  };

  const startGeneratedAmbience = () => {
    const context = audioContextRef.current ?? new window.AudioContext();
    audioContextRef.current = context;
    void context.resume();

    if (!ambienceRef.current) {
      const gain = context.createGain();
      gain.gain.value = 0;
      gain.connect(context.destination);
      const oscillators = [146.83, 220, 293.66].map((frequency, index) => {
        const oscillator = context.createOscillator();
        const toneGain = context.createGain();
        oscillator.type = index === 0 ? "sine" : "triangle";
        oscillator.frequency.value = frequency;
        toneGain.gain.value = index === 0 ? 0.38 : 0.1;
        oscillator.connect(toneGain).connect(gain);
        oscillator.start();
        return oscillator;
      });
      ambienceRef.current = { gain, oscillators };
    }
    ambienceRef.current.gain.gain.setTargetAtTime(0.075, context.currentTime, 0.7);
  };

  const toggleMusic = () => {
    if (musicOn) {
      stopAmbience();
      setMusicOn(false);
      return;
    }
    if (config.music.src) {
      if (!audioRef.current) {
        audioRef.current = new Audio(config.music.src);
        audioRef.current.loop = config.music.loop;
        audioRef.current.volume = config.music.volume;
      }
      void audioRef.current.play();
    } else {
      startGeneratedAmbience();
    }
    setMusicOn(true);
  };

  useEffect(() => {
    document.body.classList.toggle("invitation-locked", !entered);
    return () => document.body.classList.remove("invitation-locked");
  }, [entered]);

  useEffect(() => () => {
    ambienceRef.current?.oscillators.forEach((oscillator) => oscillator.stop());
    if (audioContextRef.current?.state !== "closed") void audioContextRef.current?.close();
  }, []);

  const whatsappBase = useMemo(() => `https://wa.me/${config.rsvp.whatsappNumber}`, []);

  const submitRsvp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      `Hello ${config.rsvp.hostName}!`,
      `RSVP for ${config.couple.bride} & ${config.couple.groom}`,
      `Name: ${form.get("name") || "Guest"}`,
      `Response: ${form.get("attendance")}`,
      `Guests: ${form.get("guests")}`,
      `Note: ${form.get("note") || "—"}`,
    ].join("\n");
    window.open(`${whatsappBase}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main>
      <AnimatePresence>
        {!entered && (
          <motion.section className="welcome-screen" exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}>
            <motion.div className="welcome-screen__image" style={{ backgroundImage: `url(${config.photos.hero})` }} initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 3.5, ease: "easeOut" }} />
            <div className="welcome-screen__veil" />
            <div className="welcome-screen__frame" />
            <motion.div className="welcome-screen__content" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.35 }}>
              <p className="welcome-kicker">{config.welcome.kicker}</p>
              <div className="welcome-monogram">{config.couple.monogram}</div>
              <p className="welcome-for">{config.welcome.invitationLine}</p>
              <h1>{config.couple.bride}<span>&</span>{config.couple.groom}</h1>
              <p className="welcome-date">{config.wedding.displayDate} · {config.wedding.city}</p>
              <button className="open-invitation" onClick={() => setEntered(true)}><span>{config.welcome.buttonLabel}</span><Heart size={15} fill="currentColor" /></button>
              <p className="welcome-note">{config.welcome.soundNote}</p>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      <header className="site-header">
        <button className="nav-monogram" onClick={() => scrollTo("home")} aria-label="Go to top">{config.couple.monogram}</button>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}
        </nav>
        <div className="header-actions">
          <button className={`sound-button ${musicOn ? "is-playing" : ""}`} onClick={toggleMusic} aria-label={musicOn ? "Mute wedding ambience" : "Play wedding ambience"} title={config.music.label}>
            {musicOn ? <Volume2 size={17} /> : <VolumeX size={17} />}<span>{musicOn ? "Sound on" : "Sound off"}</span>
          </button>
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={21} /></button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="mobile-menu__close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button>
            <div className="mobile-menu__monogram">{config.couple.monogram}</div>
            <nav>{navItems.map(([label, id], index) => <motion.button key={id} onClick={() => scrollTo(id)} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>{label}</motion.button>)}</nav>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="hero" id="home">
        <motion.div className="hero__image" style={prefersReducedMotion ? { backgroundImage: `url(${config.photos.hero})` } : { y: heroY, opacity: heroOpacity, backgroundImage: `url(${config.photos.hero})` }} />
        <div className="hero__overlay" />
        <motion.div className="hero__content" initial={{ opacity: 0, y: 36 }} animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }} transition={{ duration: 1, delay: 0.2 }}>
          <p className="hero__eyebrow">{config.invitation.eyebrow}</p>
          <h1><span>{config.couple.bride}</span><i>&</i><span>{config.couple.groom}</span></h1>
          <p className="hero__date">{config.wedding.displayDate}</p>
          <p className="hero__city"><MapPin size={15} /> {config.wedding.city}</p>
        </motion.div>
        <button className="scroll-cue" onClick={() => scrollTo("story")} aria-label="Explore invitation"><span>Our celebration</span><ChevronDown size={18} /></button>
      </section>

      <section className="blessing-section">
        <div className="blessing-section__pattern" />
        <motion.div className="blessing-card" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}>
          <span className="blessing-card__mark">{config.families.sacredMark}</span>
          <p>{config.families.blessing}</p>
          <h2>{config.invitation.greeting}</h2>
          <div className="family-names"><span>{config.families.bride}</span><i>and</i><span>{config.families.groom}</span></div>
        </motion.div>
      </section>

      <section className="story-section section" id="story">
        <div className="story-photo">
          <motion.div className="story-photo__inner" style={{ backgroundImage: `url(${config.photos.story})` }} initial={{ clipPath: "inset(100% 0 0 0)" }} whileInView={{ clipPath: "inset(0% 0 0 0)" }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} />
          <div className="story-photo__seal"><Heart size={18} fill="currentColor" /> {config.story.sealText}</div>
        </div>
        <motion.div className="story-copy" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8 }}>
          <span className="eyebrow">{config.story.label}</span>
          <h2>{config.story.title}</h2>
          <p>{config.story.text}</p>
          <div className="story-signature">{config.couple.bride} & {config.couple.groom}</div>
        </motion.div>
      </section>

      <section className="countdown-section">
        <div className="countdown-section__inner"><p>{config.sectionHeadings.countdown}</p><Countdown /><span>{config.wedding.displayDate} · {config.wedding.city}</span></div>
      </section>

      <section className="events-section section" id="events">
        <SectionHeading eyebrow={config.sectionHeadings.eventsEyebrow} title={config.sectionHeadings.eventsTitle} />
        <div className="events-grid">
          {config.events.map((item, index) => (
            <motion.article className="event-card" key={item.name} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.65, delay: index * 0.1 }}>
              <span className="event-card__number">0{index + 1}</span><div className="event-card__symbol">{item.symbol}</div>
              <p className="event-card__date">{item.date}</p><h3>{item.name}</h3><p className="event-card__note">{item.note}</p>
              <div className="event-card__details"><span><Clock3 size={14} /> {item.time}</span><span><MapPin size={14} /> {item.venue}</span></div>
              <p className="event-card__dress"><b>Dress code</b> {item.dressCode}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="section gallery-section__inner">
          <SectionHeading eyebrow={config.sectionHeadings.galleryEyebrow} title={config.sectionHeadings.galleryTitle} light />
          <div className="gallery-grid">
            {config.photos.gallery.map((image, index) => (
              <motion.button className={`gallery-item gallery-item--${index + 1}`} key={`${image.caption}-${index}`} onClick={() => setActiveImage(index)} initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.65, delay: index * 0.07 }} aria-label={`View ${image.caption}`}>
                <img src={image.src} alt={image.alt} style={{ objectPosition: image.position }} /><span><ImageIcon size={17} /> {image.caption}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeImage !== null && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveImage(null)}>
            <button onClick={() => setActiveImage(null)} aria-label="Close gallery"><X /></button>
            <motion.figure initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }} onClick={(event) => event.stopPropagation()}>
              <img src={config.photos.gallery[activeImage].src} alt={config.photos.gallery[activeImage].alt} style={{ objectPosition: config.photos.gallery[activeImage].position }} /><figcaption>{config.photos.gallery[activeImage].caption}</figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="venue-section section" id="venue">
        <div className="venue-copy"><span className="eyebrow">{config.sectionHeadings.venueEyebrow}</span><h2>{config.sectionHeadings.venueTitle}</h2><div className="venue-mark"><MapPin /></div><h3>{config.venue.name}</h3><p className="venue-address">{config.venue.address}</p><p>{config.venue.travelNote}</p><a href={config.venue.mapUrl} target="_blank" rel="noreferrer" className="button button--dark">{config.venue.mapButtonLabel} <ExternalLink size={15} /></a></div>
        <motion.div className="map-frame" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.8 }}><iframe src={config.venue.mapEmbedUrl} title={`Map to ${config.venue.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></motion.div>
      </section>

      <section className="rsvp-section" id="rsvp">
        <div className="rsvp-section__glow" />
        <div className="rsvp-wrap section">
          <div className="rsvp-copy"><span className="eyebrow">{config.sectionHeadings.rsvpEyebrow}</span><h2>{config.sectionHeadings.rsvpTitle}</h2><p>{config.invitation.closing}</p><span className="rsvp-deadline"><CalendarDays size={16} /> {config.rsvp.deadline}</span></div>
          <motion.form className="rsvp-form" onSubmit={submitRsvp} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7 }}>
            <label>{config.rsvp.nameLabel}<input name="name" placeholder={config.rsvp.namePlaceholder} required /></label>
            <label>{config.rsvp.attendanceLabel}<select name="attendance" defaultValue={config.rsvp.attendanceOptions[0]}>{config.rsvp.attendanceOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
            <label>{config.rsvp.guestsLabel}<select name="guests" defaultValue="1">{Array.from({ length: config.rsvp.maximumGuests }, (_, index) => index + 1).map((number) => <option key={number}>{number}</option>)}</select></label>
            <label>{config.rsvp.noteLabel}<textarea name="note" rows={3} placeholder={config.rsvp.notePlaceholder} /></label>
            <button type="submit" className="whatsapp-button"><MessageCircleHeart size={18} /> {config.rsvp.buttonLabel} <Send size={15} /></button>
          </motion.form>
        </div>
      </section>

      <footer><div className="footer-monogram">{config.couple.monogram}</div><h2>{config.couple.bride} <i>&</i> {config.couple.groom}</h2><p>{config.invitation.hashtag}</p><span>{config.footer.message}</span></footer>
      <button className="floating-music" onClick={toggleMusic} aria-label={musicOn ? "Pause music" : "Play music"}>{musicOn ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}<Music2 size={15} /></button>
    </main>
  );
}
