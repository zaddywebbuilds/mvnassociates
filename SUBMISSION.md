# Submission notes

Copy the two sections below into the reply email.

Live link: https://zaddywebbuilds.github.io/mvnassociates/
Repository: https://github.com/zaddywebbuilds/mvnassociates

---

## 1. Key design and build decisions

I treated EY, Deloitte and KPMG as references for information hierarchy rather
than for visual direction. All three communicate clearly but read almost
interchangeably, so matching their look would have produced something competent
and forgettable. Instead the homepage is one dark, lit architectural environment
that the content travels through, with two deliberate light breaks so the trust
strip and Insights stay comfortable to read. A recurring ring motif carries the
brand from the hero through the services installation to the closing section, so
the page feels like one object rather than nine stacked blocks. Typography does
most of the work: Manrope for structure with an editorial serif italic on a
single phrase per headline, since Gilroy is not freely licensable and the brief
allows a clean sans fallback. Nothing is invented, with no fabricated address,
phone number, clients, awards or article dates, and every service name and
description lives in HTML rather than inside an image or video, so the page
stays readable, translatable and keyboard accessible.

## 2. WordPress or Next.js, and why

For this build I used Next.js, exported as static HTML and served from a CDN.
The homepage is motion led, with video, layered lighting and a lot of art
direction, and that is far easier to control in React than through a theme and
plugin stack. It also removes PHP and a database from the request path
entirely: the page is static files, which is the cheapest possible way to hit
the page speed criterion.

That said, I would not recommend Next.js for every part of MNV's site. The
honest answer depends on who maintains it. WordPress earns its place when
non-technical staff publish regularly, and Insights is exactly that kind of
section, along with the forms, SEO and multilingual tooling that come as mature
plugins rather than custom work.

So for a real engagement I would propose a hybrid: this Next.js front end, with
WordPress running headless behind it for Insights and any other editorial
content. The marketing team keeps a familiar editor, and the public site keeps
static performance and full design control. If the firm would rather not run two
systems, I would use WordPress with a custom theme and accept a more restrained
visual result, because a site nobody can update is a worse outcome than a
slightly simpler one.
