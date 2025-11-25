# Keel Landing Page

A clean, modern, high-converting landing page for **Keel — AI Receptionist**, built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Smooth scroll navigation
- ✅ Attribution tracking for marketing reps (`?rep=` query parameter)
- ✅ UTM parameter tracking for demo booking links
- ✅ Lead capture form with hidden `lead_source` field
- ✅ Generic, industry-agnostic copy suitable for any service-based business

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Attribution & Tracking

The landing page automatically handles attribution tracking:

- **Rep Tracking**: If a URL contains `?rep=john`, the rep name is captured and included in:
  - The `lead_source` hidden form field (format: `"rep-landing - john"`)
  - The demo booking URL as a query parameter

- **UTM Parameters**: All "Book a demo" buttons automatically include:
  - `utm_source=rep-landing`
  - `utm_medium=partner`
  - Any existing `utm_campaign` or `utm_content` from the URL

### Example URLs

- Standard: `https://landing.keel.ai`
- With rep: `https://landing.keel.ai?rep=john`
- With rep and campaign: `https://landing.keel.ai?rep=sara&utm_campaign=summer2024`

## Configuration

### Demo Booking URL

Update the demo booking URL in `hooks/useAttribution.ts`:

```typescript
const demoBaseUrl = 'https://cal.com/your-keel-link-here'
```

Replace `'https://cal.com/your-keel-link-here'` with your actual Cal.com or booking link.

## Project Structure

```
.
├── app/
│   ├── globals.css       # Global styles with Tailwind
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main landing page
├── components/
│   └── LeadForm.tsx      # Lead capture form component
├── hooks/
│   └── useAttribution.ts # Attribution tracking hook
└── package.json
```

## Form Submission

Currently, the lead form logs submission data to the console. To integrate with your backend:

1. Update the `handleSubmit` function in `components/LeadForm.tsx`
2. Add your API endpoint
3. Handle success/error states as needed

## Customization

- **Colors**: Update the primary color in `tailwind.config.js`
- **Copy**: All text is in `app/page.tsx` and can be easily modified
- **Sections**: Add or remove sections by editing `app/page.tsx`

## License

Private project for Keel.

