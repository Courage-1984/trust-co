# Trust Co (Pty) Ltd — Website

## Project Overview
A premium, multi-page static website for **Trust Co (Pty) Ltd**, a Gauteng-based legal firm specialising in Liquidation, Trusts, and Business Rescue. The website is designed to feel authoritative, trustworthy, and conversion-focused, targeting directors, creditors, individuals, and investors seeking expert legal guidance.

---

## Brand Identity

### Colour Palette
| Name | Hex | Usage |
|------|-----|-------|
| Midnight Navy | `#0F2747` | Primary brand colour — headers, nav, footer |
| Deep Teal | `#0E5C63` | Secondary colour — buttons, icons, accents |
| Warm Gold | `#C8A96B` | Premium accent — dividers, highlights, CTAs |
| Stone Grey | `#6E7681` | Body text, supporting UI elements |
| Soft Ivory | `#F7F4EE` | Section backgrounds |
| White | `#FFFFFF` | Primary background |

### Typography
- **Headings:** Cormorant Garamond (serif) — premium legal/financial feel
- **Body:** Inter (sans-serif) — modern, clean, readable

### Logo
SVG-based emblem logo featuring a shield/crest motif in Midnight Navy with Warm Gold detail lines — symbolising protection, structure, and legal authority.

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, services overview, value proposition, approach, CTA |
| About Us | `about.html` | Who we are, approach, why choose us |
| Liquidation | `liquidation.html` | Service overview, types, our services, process, FAQs |
| Trusts | `trusts.html` | Service overview, expertise, approach, FAQs |
| Business Rescue | `business-rescue.html` | Overview, key features, comparison table, services, FAQs |
| Contact Us | `contact.html` | Contact form, info cards, consultation process |

---

## File Structure

```
/
├── index.html              # Home page
├── about.html              # About Us page
├── liquidation.html        # Liquidation services page
├── trusts.html             # Trusts services page
├── business-rescue.html    # Business Rescue page
├── contact.html            # Contact Us page
├── css/
│   └── style.css           # Global stylesheet with CSS variables & responsive design
├── js/
│   └── main.js             # Navigation, FAQ accordion, scroll animations, form handling
└── README.md
```

---

## Features Implemented

### ✅ Design & UX
- Fully responsive layout (mobile, tablet, desktop)
- Fixed/sticky navigation with scroll-triggered background
- Mobile hamburger navigation menu
- Scroll-triggered fade-up animations on all sections
- Hover effects on cards, buttons, and links
- Active nav state per page

### ✅ Pages
- Home page with hero, services grid, value/stats section, approach steps, CTA
- About Us with two-col layout, approach items, why choose us grid
- Liquidation page with overview, types comparison, services, step-by-step process, FAQs
- Trusts page with overview, 6-service grid, approach section, FAQs
- Business Rescue page with overview, comparison table (rescue vs liquidation), services, FAQs
- Contact page with info cards, multi-field form, consultation process steps

### ✅ Interactive Elements
- FAQ accordion (open/close with animation)
- Contact form with success message feedback
- Counter animation on statistics
- Smooth scroll for anchor links

### ✅ Branding
- SVG inline logo with shield emblem (Navy + Gold)
- Full brand palette applied via CSS custom properties
- Cormorant Garamond + Inter typography pairing
- Gold divider lines and tag labels throughout

---

## Placeholders to Update

The following items need to be replaced with real business information:

- `[Phone Number]` → Replace with actual phone number (appears in nav, footer, and contact page)
- `[Email Address]` → Replace with actual email address
- Physical address (if to be added)
- Director/attorney names (optional — can be added to About page)
- Company registration number (optional — useful for footer/legal section)
- Privacy Policy, Terms, and POPIA pages (currently linked as `#` placeholders)

**Files to update:**
- `index.html` — footer contact details
- `about.html` — footer contact details
- `liquidation.html` — footer contact details
- `trusts.html` — footer contact details
- `business-rescue.html` — footer contact details
- `contact.html` — contact cards and footer

---

## Recommended Next Steps

1. **Replace all placeholders** — phone, email, physical address
2. **Generate a logo image** — use the provided SVG emblem as a base or commission a professional logo file
3. **Add real photography** — team photos, office photos, or relevant stock imagery to enrich the About page and hero sections
4. **Connect contact form** — integrate with a backend email service (Formspree, Netlify Forms, EmailJS) for real form submissions
5. **Add POPIA compliance page** — full privacy policy and POPIA notice required under South African law
6. **SEO enhancements** — add Open Graph tags, sitemap.xml, robots.txt
7. **Add Google Analytics or Tag Manager** for traffic tracking
8. **Domain & hosting** — publish to a custom domain (e.g., trustco.co.za)

---

## Technical Notes

- **Pure static HTML/CSS/JS** — no frameworks or build tools required
- **CDN dependencies:** Google Fonts only (Cormorant Garamond + Inter)
- **All icons:** Inline SVG (no external icon library required)
- **CSS variables:** All brand colours defined in `:root` in `css/style.css` for easy theming
- **Responsive breakpoints:** 1024px, 768px, 480px

---

*© 2025 Trust Co (Pty) Ltd — All rights reserved.*
