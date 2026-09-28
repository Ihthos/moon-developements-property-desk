import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the property desk demo shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Moon Developements Inc\. Property Desk/);
  assert.match(html, /src="\/property-desk-demo\.html"/);
  assert.match(html, /title="Moon Developements Inc\. property desk demo"/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/);
});

test("ships the requested rental demo and manager branding", async () => {
  const demo = await readFile(
    new URL("public/property-desk-demo.html", root),
    "utf8",
  );

  assert.match(demo, /Moon Developements Inc\./);
  assert.match(demo, /Morshed Hossain/);
  assert.match(demo, /Lease follow-ups/);
  assert.match(demo, /Reach out by/);
  assert.match(demo, /Mark contacted/);
});
