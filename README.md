# Stand for Hemp

**An urgent grassroots advocacy platform to save the US hemp industry**

![Build Status](https://img.shields.io/badge/status-in%20development-yellow)
![Build Sprint](https://img.shields.io/badge/build%20sprint-7%20days-orange)
![License](https://img.shields.io/badge/license-MIT-green)

---

## What Is This?

StandforHemp.com is a frictionless advocacy website that mobilizes American consumers to contact their representatives about the hemp ban threatening the entire US hemp industry.

**The Crisis**: The hemp industry faces a ban that would eliminate thousands of jobs, cost states hundreds of millions in revenue, and destroy legitimate small businesses across all 50 states.

**The Solution**: Make it so easy that even granny can contact her representatives in 60 seconds. No accounts, no complex forms, no barriers.

---

## Build-in-Public Mission

This is an **open source, build-in-public project**. We're documenting everything publicly to:

- Generate awareness about the hemp crisis
- Show transparency in advocacy tech
- Attract contributors and supporters
- Demonstrate grassroots impact in real-time

**Timeline**: 7 days to build the platform, 1 year to mobilize enough grassroots pressure to pass new hemp protection laws.

---

## The User Flow

```
1. Enter zip code → Find your representatives
2. Choose action → Send email OR make a phone call
3. Share → Amplify on social media
```

**Target completion time**: 60 seconds from landing to action taken.

---

## Core Philosophy

**Every extra step loses 50% of users.**

This means:
- No accounts or sign-ups
- No complex forms
- No confusing navigation
- One clear path from landing to action
- Mobile-first (most users will be on phones)

---

## Project Status

**Current Phase**: Day 1 - Foundation
**Build Sprint**: November 19-26, 2025
**Campaign Duration**: 1 year to mobilize and win

### Development Roadmap

#### Phase 1: Core Website (Days 1-2) - IN PROGRESS
- [x] Brand guidelines and design system
- [ ] Homepage with zip code form
- [ ] Action counter component
- [ ] Mobile-responsive layout
- [ ] Link to national petition

#### Phase 2: Full Functionality (Days 2-3)
- [ ] Google Civic Information API integration
- [ ] Representative lookup by zip code
- [ ] Pre-filled email templates with state-specific data
- [ ] Call scripts with representative phone numbers
- [ ] AI-generated personalized story paragraphs

#### Phase 3: Viral Amplification (Days 4-7)
- [ ] Social sharing with pre-filled posts
- [ ] State-by-state impact dashboard
- [ ] Automation for outreach
- [ ] Media kit for journalists

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit [http://localhost:4321](http://localhost:4321) to see the site.

---

## Tech Stack

- **Frontend**: [Astro](https://astro.build) - Fast static site generation
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) - Following brand guidelines
- **APIs**: Google Civic Information API for representative lookup
- **Database**: Supabase (free tier) or Vercel KV for action counter
- **Hosting**: Vercel - Fast deploys, edge network
- **Analytics**: Plausible or Vercel Analytics (privacy-friendly)

---

## Project Structure

```
stand-for-hemp/
├── src/
│   ├── components/
│   │   └── library/           # Reusable components
│   ├── layouts/
│   │   ├── BaseLayout.astro   # Foundation layout
│   │   └── LandingLayout.astro
│   ├── pages/
│   │   ├── index.astro        # Homepage with zip form
│   │   ├── take-action.astro  # Representative lookup
│   │   └── success.astro      # Success + sharing page
│   ├── data/
│   │   └── state-impact.json  # State economic data
│   └── styles/
│       └── global.css         # Brand design system
├── BRAND-GUIDELINES.md        # Brand colors, typography, voice
├── PROJECT-CONTEXT.md         # Full project context & strategy
└── public/                    # Static assets
```

---

## Brand Guidelines

### Color Palette

- **Hemp Green** (`#4a6741`) - Primary CTA buttons, action elements
- **Soft Cream** (`#faf8f3`) - Main background
- **Sky Blue** (`#7ba3a0`) - Trust indicators, stats, data
- **Earth Brown** (`#8b6f47`) - Urgency badges, secondary actions
- **Soil Dark** (`#2d3e2b`) - Body text, dark backgrounds
- **Wheat Gold** (`#d4a574`) - Highlights, accents, links
- **Warm Cream** (`#f5f1e8`) - Card backgrounds

### Brand Voice

- **Urgent but not panicked**: We have limited time, but we're organized
- **Grassroots & authentic**: Real people, real stories, real impact
- **Accessible**: No jargon - anyone can take action
- **Empowering**: Your voice matters. You can make a difference.
- **Agricultural heritage**: Rooted in American farming

---

## Key Messages

**Main Headline**: "The Hemp Ban Will Cost [State] $XXM and Thousands of Jobs"

**Value Propositions**:
- Takes 60 seconds
- No sign-up required
- Your voice matters
- Join thousands of Americans taking action

---

## Target Users

### Primary
- **Hemp consumers**: People who use hemp products for sleep, pain, anxiety
- **Hemp business owners**: Farmers, retailers, manufacturers
- **First-time activists**: Regular people who've never contacted a representative

### Key Insight
Most users have NEVER done political advocacy. We're mobilizing regular people who just want their gummies to stay legal, not preaching to activists.

---

## Success Metrics

### Primary
- Total actions taken (emails + calls)
- States represented (geographic spread)
- Viral coefficient (average shares per user)

### Secondary
- Time to action (speed from landing to completion)
- Mobile completion rate
- Return rate (users taking multiple actions)
- Media mentions

### Aspirational
- Representatives who publicly respond
- Policy impact (ban delayed/stopped)

---

## How to Contribute

We welcome contributions from:
- **Developers**: Frontend, API integration, automation
- **Designers**: Graphics, social media assets
- **Writers**: Copy, email templates, social posts
- **Data researchers**: State economic impact data
- **Advocates**: Spreading the word, organizing

### Ways to Help

1. **Code contributions**: Submit PRs for features or fixes
2. **Data gathering**: Research state-specific economic impact
3. **Content creation**: Write compelling stories and templates
4. **Testing**: Test on different devices and browsers
5. **Sharing**: Spread the word on social media

---

## Development Principles

### Speed > Perfection
Ship fast, iterate in production. We have 7 days.

### Mobile-First
Most traffic will be mobile. Test on phones first.

### Accessibility Matters
High contrast, clear CTAs, screen reader friendly.

### Keep It Simple
If granny can't use it, it's too complex.

---

## Documentation

- **[PROJECT-CONTEXT.md](PROJECT-CONTEXT.md)**: Complete project strategy, user flows, technical architecture
- **[BRAND-GUIDELINES.md](BRAND-GUIDELINES.md)**: Colors, typography, component design, brand voice

---

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |

---

## API Keys Needed

- **Google Civic Information API**: For representative lookup (free)
- **Backup**: whoismyrepresentative.com API (no key required)
- **Optional**: Claude API for personalized story generation

---

## Deployment

Deploy to Vercel for fast, global edge network:

```bash
npm run build
# Deploy dist/ folder to Vercel
```

---

## License

MIT License - Free to use, modify, and distribute.

This is a grassroots advocacy project. Use this code to build similar platforms for other causes.

---

## Contact & Social

- **Website**: StandforHemp.com (launching soon)
- **Issues**: [GitHub Issues](https://github.com/[your-repo]/stand-for-hemp/issues)
- **Discussions**: [GitHub Discussions](https://github.com/[your-repo]/stand-for-hemp/discussions)

---

## The Stakes

**Thousands of jobs** across all 50 states
**Hundreds of millions** in lost state revenue
**Legitimate businesses** destroyed overnight
**Americans** pushed to unregulated black markets

**But we can stop this.**

One voice might not be heard. But thousands of voices, all speaking up at once, cannot be ignored.

**Join us. Take action. Save hemp.**

---

**Version**: 1.0
**Last Updated**: November 19, 2025
**Status**: Day 1 - Foundation Phase
**Build Sprint**: 7 days to launch
**Campaign Duration**: 1 year to win
