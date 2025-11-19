# Stand for Hemp - Project Context

## What We're Building
StandforHemp.com - An urgent advocacy website to mobilize hemp consumers to contact their representatives about the hemp ban threatening the US hemp industry.

## The Crisis
The US hemp industry is facing a ban that would:
- **Eliminate thousands of jobs** across all 50 states
- **Cost states hundreds of millions in revenue**
- **Destroy legitimate small businesses** (farms, retailers, manufacturers)
- **Push consumers to unregulated black markets**
- **Harm Americans who rely on hemp for sleep, pain, and anxiety relief**

**Timeline**: We have 7 days to BUILD this platform, then a year to generate enough grassroots pressure to get a new law passed protecting hemp.

## The Solution
A frictionless website where anyone - even a grandma who uses gummies for sleep - can take action in 60 seconds:

1. **Enter zip code** → Find their representatives
2. **Choose action** → Send email OR make a phone call
3. **Share** → Amplify the movement on social media

## Core Philosophy
**Every extra step loses 50% of users.**

This means:
- No accounts or sign-ups
- No complex forms
- No confusing navigation
- One clear path from landing to action
- Mobile-first (most users will be on phones)

## Target Users

### Primary
- **Hemp consumers**: People who use hemp products for sleep, pain, anxiety, or wellness
- **Hemp business owners**: Farmers, retailers, manufacturers whose livelihoods are at stake
- **First-time activists**: Regular people who've never contacted a representative before

### Key Insight
Most of our users have NEVER done political advocacy. We're not preaching to activists - we're mobilizing regular people who just want their gummies to stay legal.

## Technical Architecture

### Phase 1: Core Website (Day 1 - TODAY)
**Goal**: Ship a working homepage where people can start taking action

**Components**:
- Homepage with zip code form
- Action counter (starts at 0, updates in real-time)
- Link to national petition
- Mobile-responsive, fast-loading

**Next Step**: Representative lookup page (Day 2)

### Phase 2: Full Functionality (Days 2-3)
- Google Civic Information API integration
- Representative lookup by zip code
- Pre-filled email templates with state-specific data
- Call scripts with representative phone numbers
- AI-generated personalized story paragraphs

### Phase 3: Viral Amplification (Days 4-7)
- Social sharing with pre-filled posts
- State-by-state impact dashboard
- Automation for outreach (social media, influencers, businesses)
- Media kit for journalists

## User Flow
```
┌─────────────┐
│   LANDING   │  Enter zip code
│  Homepage   │  
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    YOUR     │  See 2-3 representatives
│    REPS     │  (House + Senators)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   CHOOSE    │  Email OR Call
│   ACTION    │  (or both!)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   SUCCESS   │  Counter increments
│  + SHARE    │  Pre-filled social posts
└─────────────┘
```

**Target time**: 60 seconds from landing to completing action

## Data Structure

### State Economic Impact Data
We need data for all 50 states:
```json
{
  "CA": {
    "revenue_loss": "500M",
    "jobs_at_risk": "15000",
    "hemp_businesses": "1200"
  },
  "TX": {
    "revenue_loss": "350M",
    "jobs_at_risk": "8500",
    "hemp_businesses": "890"
  }
  // ... etc
}
```

### Representative Information (from API)
- Name, party, district
- Office phone number
- Contact form URL (when available)
- Office address
- Social media handles

### Email Template Variables
- `{rep_name}` - Representative's name
- `{state}` - User's state
- `{revenue_loss}` - State-specific revenue impact
- `{jobs_at_risk}` - State-specific job impact
- `{user_story}` - AI-generated personal paragraph
- `{user_name}` - User's name
- `{user_city}` - User's city

## Key Messages

### Main Headline
"The Hemp Ban Will Cost [State] $XXM and Thousands of Jobs"

### Value Propositions
- ✅ Takes 60 seconds
- ✅ No sign-up required
- ✅ Your voice matters
- ✅ Join thousands of Americans taking action

### Tone Guidelines
- **Urgent but not panicked**: "We have 7 days" not "It's all over"
- **Empowering not guilt-tripping**: "You can make a difference" not "You're responsible if we lose"
- **Authentic not corporate**: Real people, real stories, grassroots energy
- **Clear not jargony**: Plain English, no political speak
- **Agricultural heritage**: Rooted in American farming and entrepreneurship

## Success Metrics

### Primary
- **Total actions taken**: Emails sent + calls made
- **States represented**: Geographic spread
- **Viral coefficient**: Average shares per user

### Secondary
- **Time to action**: How fast from landing to completion
- **Mobile completion rate**: % who complete on mobile
- **Return rate**: % who take multiple actions
- **Media mentions**: Press coverage generated

### Aspirational
- **Political responses**: Representatives who publicly respond
- **Policy impact**: If the ban is delayed/stopped

## Technical Stack

### Frontend
- **Astro**: Fast, static site generation
- **Tailwind CSS**: For styling (following brand guidelines)
- **Alpine.js or Vanilla JS**: Minimal interactivity

### APIs
- **Google Civic Information API**: Representative lookup
  - Free to use, requires API key
  - Endpoint: `civicinfo.googleapis.com/civicinfo/v2/representatives`
- **Backup**: whoismyrepresentative.com API (no key required)

### Database
- **Supabase** (free tier) OR **Vercel KV**: For action counter
- **Airtable** (optional): For tracking detailed analytics

### Hosting
- **Vercel**: Fast deploys, edge network, free SSL

### Analytics
- **Plausible** or **Vercel Analytics**: Privacy-friendly, simple

## Design Principles

### 1. Progressive Disclosure
Show users only what they need for the current step. Don't overwhelm with all options at once.

### 2. Social Proof
- Live counter showing actions taken
- "Join [X] Americans taking action"
- State-specific stats

### 3. Urgency Without Panic
- "7 days to build, 1 year to win" messaging
- Focus on momentum and movement-building
- But keep tone empowering, not doom-and-gloom

### 4. Friction Removal
- No accounts
- No CAPTCHA unless absolutely necessary
- Auto-fill everything possible
- One-click sharing

### 5. Mobile-First
- Large tap targets (44px minimum)
- Numeric keyboard for zip codes
- Thumb-friendly button placement
- Fast load times

## Build-in-Public Strategy
We're documenting everything publicly to:
- Generate awareness
- Show transparency
- Attract contributors
- Demonstrate impact

**Daily posts**: Progress updates, stats, technical details, user stories

## Open Questions (To Resolve)

### Day 1
- [ ] Do we have state economic impact data? (Need to research/compile)
- [ ] Google API key obtained?
- [ ] Petition link from change.org?

### Day 2
- [ ] Contact form submission vs mailto links?
- [ ] AI integration for personalized stories (Claude API)?
- [ ] How to handle representatives without contact forms?

### Day 3+
- [ ] Automation platform choice (Make.com vs n8n)?
- [ ] Social media bot strategy?
- [ ] Influencer outreach list?

## Repository Structure (Suggested)
```
/src
  /pages
    index.astro          # Homepage
    take-action.astro    # Representative lookup & action page
    success.astro        # Success page with sharing
  /components
    ZipCodeForm.astro
    ActionCounter.astro
    RepCard.astro
    EmailTemplate.astro
  /layouts
    Layout.astro         # Base layout with brand styles
  /data
    state-impact.json    # State economic data
  /styles
    global.css           # Global styles following brand guidelines
```

## Critical Reminders

### For Developers
- **Speed > Perfection**: Ship fast, iterate in production
- **Test on mobile**: Most traffic will be mobile
- **Accessibility matters**: High contrast, clear CTAs, screen reader friendly
- **Keep it simple**: If granny can't use it, it's too complex

### For Content
- **Real data**: Use actual economic impact numbers
- **No fear-mongering**: Urgent but empowering tone
- **Personal stories**: Make it about real people, not statistics
- **Clear CTAs**: Always tell users exactly what to do next

---

**Version**: 1.0  
**Last Updated**: November 19, 2025  
**Status**: DAY 1 - FOUNDATION PHASE  
**Build Sprint**: 7 days to ship full platform  
**Campaign Duration**: 1 year to mobilize and pass new hemp protection law