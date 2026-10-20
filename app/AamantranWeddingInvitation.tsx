"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  ExternalLink,
  MessageCircleHeart,
  Music2,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { CSSProperties, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { weddingConfig as config } from "./wedding.config";

type EntryPhase = "sealed" | "opening" | "open";

function calculateTimeLeft(target: string) {
  const difference = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
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
      1_000,
    );
    return () => {
      window.clearTimeout(firstTick);
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className="film-countdown" aria-label="Countdown to the wedding">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.78, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function OrnateFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`film-ornate-frame ${className}`}>
      <span className="film-ornate-frame__top" aria-hidden="true">❀　❧　✿　❧　❀</span>
      <span className="film-ornate-corner film-ornate-corner--tl" aria-hidden="true">❀</span>
      <span className="film-ornate-corner film-ornate-corner--tr" aria-hidden="true">❀</span>
      <span className="film-ornate-corner film-ornate-corner--bl" aria-hidden="true">❀</span>
      <span className="film-ornate-corner film-ornate-corner--br" aria-hidden="true">❀</span>
      {children}
      <span className="film-ornate-frame__bottom" aria-hidden="true">❀　❧　✿　❧　❀</span>
    </div>
  );
}

export function AamantranWeddingInvitation() {
  const [phase, setPhase] = useState<EntryPhase>("sealed");
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const generatedMusicRef = useRef<{ gain: GainNode; oscillators: OscillatorNode[] } | null>(null);
  const openingTimerRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const themeStyle = {
    "--film-rose": config.theme.colors.wineSoft,
    "--film-rose-dark": config.theme.colors.wine,
    "--film-ivory": config.theme.colors.cream,
    "--film-ink": config.theme.colors.ink,
    "--film-gold": config.theme.colors.gold,
  } as CSSProperties;

  const stopMusic = () => {
    audioRef.current?.pause();
    const context = audioContextRef.current;
    const generated = generatedMusicRef.current;
    if (context && generated) {
      generated.gain.gain.cancelScheduledValues(context.currentTime);
      generated.gain.gain.setTargetAtTime(0, context.currentTime, 0.08);
    }
  };

  const startGeneratedMusic = () => {
    const context = audioContextRef.current ?? new window.AudioContext();
    audioContextRef.current = context;
    void context.resume();

    if (!generatedMusicRef.current) {
      const gain = context.createGain();
      gain.gain.value = 0;
      gain.connect(context.destination);
      const oscillators = [146.83, 220, 293.66].map((frequency, index) => {
        const oscillator = context.createOscillator();
        const toneGain = context.createGain();
        oscillator.type = index === 0 ? "sine" : "triangle";
        oscillator.frequency.value = frequency;
        toneGain.gain.value = index === 0 ? 0.35 : 0.08;
        oscillator.connect(toneGain).connect(gain);
        oscillator.start();
        return oscillator;
      });
      generatedMusicRef.current = { gain, oscillators };
    }
    generatedMusicRef.current.gain.gain.setTargetAtTime(0.065, context.currentTime, 0.65);
  };

  const toggleMusic = () => {
    if (musicOn) {
      stopMusic();
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
      startGeneratedMusic();
    }
    setMusicOn(true);
  };

  const openInvitation = () => {
    if (phase !== "sealed") return;
    setPhase("opening");
    if (config.presentation.playMusicWhenOpened && !musicOn) toggleMusic();
    openingTimerRef.current = window.setTimeout(
      () => setPhase("open"),
      prefersReducedMotion ? 150 : config.presentation.entryAnimationDurationMs,
    );
  };

  useEffect(() => {
    document.body.classList.toggle("invitation-locked", phase !== "open");
    return () => document.body.classList.remove("invitation-locked");
  }, [phase]);

  useEffect(
    () => () => {
      if (openingTimerRef.current) window.clearTimeout(openingTimerRef.current);
      generatedMusicRef.current?.oscillators.forEach((oscillator) => oscillator.stop());
      if (audioContextRef.current?.state !== "closed") void audioContextRef.current?.close();
    },
    [],
  );

  const whatsappUrl = useMemo(() => {
    const message = `Hello ${config.rsvp.hostName}! I am responding to the wedding invitation for ${config.couple.bride} and ${config.couple.groom}.`;
    return `https://wa.me/${config.rsvp.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }, []);

  const heroVersions = {
    photo: (
      <motion.img
        className="film-hero__photo"
        src={config.photos.hero}
        alt={`${config.couple.bride} and ${config.couple.groom}`}
        initial={prefersReducedMotion ? false : { scale: 1.08 }}
        animate={phase === "open" ? { scale: 1 } : { scale: 1.08 }}
        transition={{ duration: 2.1, ease: "easeOut" }}
      />
    ),
    paper: <div className="film-hero__paper" aria-hidden="true" />,
  };

  return (
    <main className="film-site" style={themeStyle}>
      <AnimatePresence>
        {phase !== "open" && (
          <motion.section
            className={`film-cover ${phase === "opening" ? "is-opening" : ""}`}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="film-cover__canvas">
              <motion.div
                className="film-cover__sacred"
                animate={phase === "opening" ? { opacity: 0, y: -70 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
              >
                <img src={config.branding.omLogo} alt={config.families.sacredMark} />
              </motion.div>

              <motion.div
                className="film-cover__paper-reveal"
                initial={{ scale: 0.72, opacity: 0 }}
                animate={phase === "opening" ? { scale: 1.08, opacity: 1 } : { scale: 0.72, opacity: 0 }}
                transition={{ duration: 0.95, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.div className="film-flap film-flap--left" animate={phase === "opening" ? { x: "-104%", opacity: 0 } : { x: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.25 }} />
              <motion.div className="film-flap film-flap--right" animate={phase === "opening" ? { x: "104%", opacity: 0 } : { x: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.25 }} />
              <motion.div className="film-flap film-flap--bottom" animate={phase === "opening" ? { y: "105%", opacity: 0 } : { y: 0, opacity: 1 }} transition={{ duration: 0.85, delay: 0.3 }} />

              <motion.button
                className="film-seal"
                type="button"
                onClick={openInvitation}
                aria-label={config.welcome.buttonLabel}
                animate={phase === "opening" ? { scale: 0, rotate: 32, opacity: 0 } : { scale: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img src={config.branding.waxStamp} alt="Open the wedding invitation" />
              </motion.button>
              <motion.div className="film-cover__families" animate={phase === "opening" ? { opacity: 0 } : { opacity: 1 }}>
                <span>With Love &amp; Blessings</span>
                <strong>{config.families.bride} &amp; {config.families.groom}</strong>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="film-canvas">
        <section className={`film-hero film-hero--${config.presentation.heroMode}`}>
          {heroVersions[config.presentation.heroMode]}
          <div className="film-hero__wash" />
          <OrnateFrame className="film-hero__frame">
            <motion.div
              className="film-hero__content"
              initial={{ opacity: 0, y: 24 }}
              animate={phase === "open" ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <p>{config.invitation.heroGreeting}</p>
              <h1><span>{config.couple.bride}</span><i>&amp;</i><span>{config.couple.groom}</span></h1>
              <b>{config.invitation.hashtag}</b>
              <a href="#begins" aria-label="Scroll to the invitation">Scroll <ChevronDown size={15} /></a>
            </motion.div>
          </OrnateFrame>
        </section>

        <section className="film-begins film-paper" id="begins">
          <Reveal className="film-hands">
            <img src={config.branding.handsIllustration} alt="Bride and groom holding hands" />
          </Reveal>
          <Reveal className="film-begins__copy">
            <h2>Our Forever Begins</h2>
            <strong>{config.wedding.shortDate}</strong>
            <p>{config.families.blessing}</p>
            <p>{config.invitation.greeting}</p>
          </Reveal>
          <Reveal className="film-countdown-wrap">
            <h3>{config.sectionHeadings.countdown}</h3>
            <Countdown />
          </Reveal>
        </section>

        <section className="film-promise">
          <OrnateFrame>
            <Reveal className="film-promise__content">
              <p>A Promise for a Lifetime</p>
              <span>{config.families.groomGrandparents}</span>
              <h2>{config.couple.groom}</h2>
              <span>{config.families.groomParents}</span>
              <i>&amp;</i>
              <span>{config.families.brideGrandparents}</span>
              <h2>{config.couple.bride}</h2>
              <span>{config.families.brideParents}</span>
            </Reveal>
          </OrnateFrame>
        </section>

        <section className="film-events film-paper" id="events">
          <Reveal className="film-script-heading">
            <span>{config.sectionHeadings.eventsEyebrow}</span>
            <h2>{config.sectionHeadings.eventsTitle}</h2>
          </Reveal>
          <div className="film-timeline">
            {config.events.map((event, index) => (
              <motion.article
                key={event.name}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.65, delay: index * 0.04 }}
              >
                <span className="film-timeline__heart">♥</span>
                <div className="film-event__top">
                  <h3>{event.name}</h3>
                  <strong>{event.time}</strong>
                </div>
                <div className="film-event__date"><span>{event.date}</span><b>0{index + 1}</b></div>
                <p>{event.venue}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="film-location" id="venue">
          <OrnateFrame>
            <Reveal className="film-location__heading">
              <span>{config.sectionHeadings.venueEyebrow}</span>
              <h2>{config.venue.sectionTitle}</h2>
              <p>{config.venue.name}</p>
              <small>{config.venue.address}</small>
            </Reveal>
            <motion.div
              className="film-map-frame"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.8 }}
            >
              <iframe src={config.venue.mapEmbedUrl} title={`Map to ${config.venue.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </motion.div>
            <a className="film-location__button" href={config.venue.mapUrl} target="_blank" rel="noreferrer">
              {config.venue.mapButtonLabel} <ExternalLink size={14} />
            </a>
          </OrnateFrame>
        </section>

        <section className="film-rsvp film-paper" id="rsvp">
          <div className="film-rsvp__envelope">
            <div className="film-rsvp__back" />
            <Reveal className="film-rsvp__card">
              <span>With Love, {config.rsvp.hostName}</span>
              <h2>RSVP / CONTACT</h2>
              {config.rsvp.contacts.map((contact) => (
                <p key={contact.name}><b>{contact.name}</b><a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a></p>
              ))}
              <small>{config.rsvp.deadline}</small>
              <a className="film-rsvp__whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircleHeart size={16} /> {config.rsvp.buttonLabel}</a>
            </Reveal>
            <div className="film-rsvp__front film-rsvp__front--left" />
            <div className="film-rsvp__front film-rsvp__front--right" />
            <div className="film-rsvp__front film-rsvp__front--bottom" />
            <div className="film-rsvp__seal">❧</div>
          </div>
        </section>

        <footer className="film-footer">
          <img src={config.branding.omLogo} alt={config.families.sacredMark} />
          <p>{config.footer.message}</p>
          <b>{config.couple.bride} &amp; {config.couple.groom}</b>
        </footer>
      </div>

      <button className="film-music" type="button" onClick={toggleMusic} aria-label={musicOn ? "Pause music" : "Play music"} title={config.music.label}>
        {musicOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
        {musicOn ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
        <Music2 size={14} />
      </button>
    </main>
  );
}
