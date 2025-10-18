## Tenerife.Music — Site Audit (Pre-Release)

### Summary
- Scope: Full static code audit plus configuration and integration review after recent updates.
- Result: No blocking build issues detected. Several critical and warning items identified across SEO, API integration, security headers, performance, and UX.
- Priority: Address Critical Issues before public release; tackle Warnings next sprint.

### Critical Issues
- Frontend → External API integration missing
  - Expected endpoints in spec: `https://api.tenerife.music/api/events` and `/api/venues`.
  - Current implementation uses mock data in `components/events.tsx` and `components/venues.tsx`; no fetch to external API is present.
  - Risk: Live site will not show real data; content will be static and potentially misleading.
  - Fix: Implement data fetching with `fetch('https://api.tenerife.music/api/events', { next: { revalidate: 300 } })` (SSR) or SWR/React Query (CSR) with graceful fallbacks and skeletons.

- SEO → Missing structured data (schema.org)
  - No JSON-LD present for Organization/WebSite/Event/Place.
  - Risk: Reduced rich result eligibility and weaker vertical SEO for events.
  - Fix: Add JSON-LD in `app/layout.tsx` for Organization/WebSite; per-section JSON-LD for Events and Places when real data is wired.

- Security → Security headers not configured
  - No custom headers in `next.config.js`; default headers omit CSP, Referrer-Policy, Permissions-Policy, X-Frame-Options.
  - Risk: Clickjacking, mixed content, referrer leakage, looser sandboxing for embedded resources.
  - Fix: Add headers in Next config (or at platform level) for `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`.

- SEO → Canonical and OG image must be consistent across pages
  - Home uses canonical and `og.jpg` (local). Contact page lacks dedicated `metadata`.
  - Risk: Suboptimal sharing previews and potential duplicate content signals.
  - Fix: Add `export const metadata` to `app/contact/page.tsx` with page-specific title/description and allow fallback to global OG image.

### Warnings
- Performance → Images and animations
  - `next.config.js` sets `images.unoptimized = true`; many large remote images used. Heavy animations (framer-motion) across sections.
  - Impact: LCP/CLS risk on lower-end devices; increased bandwidth; potential jank.
  - Fix: Consider enabling optimizer or hosting key images locally; add `prefers-reduced-motion` handling (Tailwind/JS check) to reduce animation for sensitive users.

- SEO → Robots/Sitemap done but ensure production domain
  - `public/robots.txt` and `public/sitemap.xml` use `https://tenerife.music`. Validate domain before release.

- UX/A11y → Dialog accessibility improvements still needed for all modals
  - `SubscriptionModal` and preview modals should include focus trapping and ESC close like nav; add `role="dialog"`, `aria-modal`, labelled titles, and return focus on close.

- UX → 404 page missing
  - No `app/not-found.tsx` present.
  - Fix: Add branded 404 with link back home.

- i18n → No language switcher
  - Site is English-only. If localization is planned, decide strategy (Next i18n routing or third-party) and indicate default locale to users.

### Recommendations

1. Frontend & Structure
- Implement SSR/ISR data fetching for events and venues with graceful skeletons and error states. Validate and normalize API payloads to avoid `undefined/null` in UI.
- Keep navigation improvements: aria attributes, focus trap, ESC close (done). Replicate modal a11y patterns across modals.
- Add `app/not-found.tsx` with a minimal branded layout.

2. API Integration
- Endpoints: `GET https://api.tenerife.music/api/events`, `GET https://api.tenerife.music/api/venues`.
- Client: For landing page, SSR with `fetch` + 5–10 min revalidation; CSR for filters using SWR/React Query. Provide offline fallback notice and cached last-known-good data.
- Consistency: Validate fields (title, date, location, genres, images) and sanitize strings. Guard `Image` with placeholder if image URL missing or invalid.

3. Performance
- Lighthouse: Schedule CI run for Performance/Accessibility/Best Practices/SEO; set thresholds to fail builds under targets.
- Metrics to watch: TTFB (<200ms on CDN), LCP (<2.5s), CLS (<0.1). Optimize hero images; preconnect/preload fonts and critical assets as needed.
- Assets: Host key hero/background images locally; compress to webp/avif; remove unused UI libraries if not needed.

4. SEO
- Present: title, description, canonical (home), OG/Twitter, `manifest.json`, `favicon.svg`.
- Add: JSON-LD for `Organization` and `WebSite` in `app/layout.tsx` via a script tag. When API is live, inject `Event` and `Place` JSON-LD on sections/pages.
- Ensure: Each route has a unique `title`/`description`, H1 present, heading hierarchy maintained.

5. Security
- Headers: Add CSP (script-src self plus Next assets; img-src self data blob https:; object-src none), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, reasonable `Permissions-Policy`.
- SSL/HTTPS: Enforce HTTPS via platform (Vercel or Nginx) and HSTS (`Strict-Transport-Security`) when domain is stable.
- Forms: Current server routes validate fields; also validate client-side. Rate-limit API routes and add basic spam protection (honeypot or token).

6. User Experience
- Navigation: Improved a11y shipped. Verify smooth scroll and focus-visible styles for keyboard users.
- Coming Soon: Maintain clear messaging where features are not yet available; disable or replace placeholder links with informative states.
- Internationalization: If not in scope for MVP, at least expose `lang="en"` (present) and avoid mixed-language content.

### Notable Code References
- Metadata and SEO
  - `app/layout.tsx` — global `metadata` with canonical and `og.jpg`.
- Navigation Accessibility
  - `components/navigation.tsx` — aria-expanded, aria-controls, `role="dialog"`, focus trap, ESC close for mobile menu.
- Placeholder Data
  - `components/events.tsx` and `components/venues.tsx` — mocked arrays driving UI (no external fetch yet).
- API Endpoints
  - `app/api/subscribe/route.ts` and `app/api/contact/route.ts` — basic validation; no DB yet.

---

Appendix: Checklist
- [ ] Wire real API endpoints with SSR/ISR and CSR filters
- [ ] Add JSON-LD (Organization/WebSite), plan Event/Place JSON-LD
- [ ] Add security headers and enforce HTTPS/HSTS
- [ ] Add `not-found.tsx`
- [ ] Optimize hero images and consider enabling Next image optimizer
- [ ] Complete modal a11y parity (dialog roles, focus trap, ESC)

