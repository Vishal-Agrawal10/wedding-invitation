import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the royal wedding invitation", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Bride Name &amp; Groom Name/);
  assert.match(html, /A royal wedding invitation/i);
  assert.match(html, /Open invitation/i);
  assert.match(html, /WhatsApp/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps personalisation in one configuration file", async () => {
  const config = await readFile(new URL("../app/wedding.config.ts", import.meta.url), "utf8");
  assert.match(config, /PERSONALISE YOUR INVITATION HERE/);
  assert.match(config, /whatsappNumber/);
  assert.match(config, /mapEmbedUrl/);
  assert.match(config, /events:/);
  assert.match(config, /gallery:/);
});
