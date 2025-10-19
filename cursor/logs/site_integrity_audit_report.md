## Tenerife.Music — Site Integrity & SEO Bootstrap Audit

### Summary
- Performed structural, SEO, and QA pass. Fixed Subscribe modal hook-order crash, added dynamic robots/sitemap routes, and scaffolded core pages to prevent 404s.

### Checks & Results
- Structure & Routing: Added pages for `/about`, `/privacy`, `/terms`, `/cookies`, `/events`, `/venues`, `/genres`, `/areas`, `/calendar`, `/news`.
- SEO: Added `app/robots.ts`, `app/sitemap.ts`. Global canonical/OG already present. JSON-LD (Organization/WebSite) exists; Event/Place planned on data pages.
- Content Hubs: News and Events/Venues pages include intro text to assist crawlability; internal linking can be expanded once details exist.
- Accessibility: Subscription modal now respects hook rules, traps focus, and closes with Escape.
- API Integration: External events/venues endpoints not wired yet (out of scope for this pass).

### Fixes Implemented
- Subscription modal: removed early-return hook violation; conditioned rendering and guarded effect by `isOpen`.
- SEO routes: implemented `app/robots.ts` and `app/sitemap.ts` with core URLs and timestamps.
- Base pages: created core routes with minimal SEO metadata to avoid 404s.

### Checklist
- [x] No missing base pages for core routes
- [x] robots and sitemap via route handlers
- [x] Canonical and OG present
- [x] Subscribe modal opens/closes; Escape closes
- [ ] Live API data for events/venues (deferred)


