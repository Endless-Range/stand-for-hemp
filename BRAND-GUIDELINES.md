# Stand for Hemp - Brand Guidelines

## Brand Mission
Mobilize American consumers to save the hemp industry through grassroots action. Make it so easy that even granny can contact her representatives.

---

## Logo

### Primary Logo
**File**: `standforhemp-logo.png`

**Design**: A raised fist (solidarity symbol) in Wheat Gold (#d4a574) centered in front of a hemp leaf in Hemp Green (#4a6741).

**Logo Usage**:
- Use on white or light backgrounds (Soft Cream #faf8f3)
- Minimum size: 32px (for favicon)
- Maintain aspect ratio - never stretch or distort
- Always use on transparent background for web
- Clear space: Minimum 20px padding around logo on all sides

**Logo Variations Needed**:
- Full color (primary use)
- Monochrome/single color for special applications
- Favicon size (32x32px, 64x64px)
- Social media profile (400x400px minimum)

**Do NOT**:
- Change the colors
- Add effects (drop shadows, glows, etc.)
- Rotate or skew
- Place on busy backgrounds that reduce visibility

## Brand Voice
- **Urgent but not panicked**: We have 7 days, but we're organized and effective
- **Grassroots & authentic**: Real people, real stories, real impact
- **Accessible**: No jargon, no complexity - anyone can take action
- **Empowering**: Your voice matters. You can make a difference.
- **Agricultural heritage**: Rooted in American farming and entrepreneurship

---

## Color Palette

### Primary Colors

#### Hemp Green
- **Hex**: `#4a6741`
- **Usage**: Primary CTA buttons, action elements, urgent messaging, primary brand color
- **Psychology**: Action, growth, nature, grassroots movement
- **Examples**: "Take Action Now" buttons, key headlines, active states

#### Soft Cream
- **Hex**: `#faf8f3`
- **Usage**: Main background color
- **Psychology**: Clean, approachable, easy to read
- **Examples**: Page backgrounds, breathing room

### Secondary Colors

#### Sky Blue
- **Hex**: `#7ba3a0`
- **Usage**: Trust indicators, stats, informational accents, secondary CTA sections
- **Psychology**: Trust, credibility, calm authority
- **Examples**: Stat card borders, "Don't Let Hemp Die" section background, data visualization

#### Earth Brown
- **Hex**: `#8b6f47`
- **Usage**: Urgency badges, secondary actions, warm highlights
- **Psychology**: Agricultural, earthy, grounded
- **Examples**: "7 DAYS TO SAVE HEMP" urgency badge, secondary buttons

#### Soil Dark
- **Hex**: `#2d3e2b`
- **Usage**: Body text, dark backgrounds, serious messaging
- **Psychology**: Authoritative, grounded, readable
- **Examples**: All body text, footer backgrounds, headlines

#### Wheat Gold
- **Hex**: `#d4a574`
- **Usage**: Highlights, accents, secondary elements, links
- **Psychology**: Harvest, prosperity, warmth
- **Examples**: Footer links, accent elements, highlights

#### Warm Cream
- **Hex**: `#f5f1e8`
- **Usage**: Card backgrounds, subtle sections
- **Psychology**: Warm, inviting, layered depth
- **Examples**: Stat cards, impact cards, form backgrounds

---

## Typography Guidelines

### Headings
- **Font Family**: System fonts for fast loading and familiarity
  - `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **H1**: 3em, bold, Hemp Green or Soil Dark
- **H2**: 2.5em, bold, Soil Dark
- **H3**: 1.5em, semi-bold, Hemp Green

### Body Text
- **Font Family**: Same as headings for consistency
- **Size**: 1em (16px base)
- **Color**: Soil Dark (#2d3e2b)
- **Line Height**: 1.6-1.7 for readability
- **Secondary Text**: `#5a6c57` (lighter variation of Soil Dark)

---

## Component Guidelines

### Buttons

#### Primary CTA Button
```css
background: #4a6741; /* Hemp Green */
color: white;
padding: 18px 45px;
border-radius: 8px;
font-size: 1.2em;
font-weight: 600;
box-shadow: 0 4px 6px rgba(0,0,0,0.2);
```
**Hover State**:
```css
background: #2d3e2b; /* Soil Dark */
transform: translateY(-2px);
box-shadow: 0 6px 12px rgba(0,0,0,0.3);
```

#### Secondary Button
```css
background: #8b6f47; /* Earth Brown */
color: white;
/* Same padding and styling as primary */
```

### Cards
```css
background: white;
border-radius: 12px;
padding: 30-35px;
box-shadow: 0 4px 6px rgba(0,0,0,0.1);
```

### Stat Cards (Special)
```css
background: #f5f1e8; /* Warm Cream */
border-left: 4px solid #7ba3a0; /* Sky Blue */
border-radius: 12px;
padding: 30px;
```

### Urgency Badges
```css
background: #8b6f47; /* Earth Brown */
color: white;
padding: 10px 20px;
border-radius: 20px;
font-weight: 600;
```

---

## Layout Guidelines

### Spacing
- **Section Padding**: 80px top/bottom for desktop, 60px for mobile
- **Content Max-Width**: 1200px for full sections, 800-900px for reading content
- **Card Gaps**: 30px between cards
- **Element Margins**: 20px standard, 40-50px for major sections

### Backgrounds
- **Primary Background**: Soft Cream (#faf8f3)
- **Alternating Sections**: White for contrast
- **Hero Sections**: Gradient or solid Hemp Green/Soil Dark
- **Special CTAs**: Sky Blue solid

---

## Icon & Emoji Usage
- Use sparingly but strategically: 🌱 for branding, 👨‍🌾 for farmers, 💰 for economics, 🏥 for health, ⏰ for urgency
- Keep it friendly and accessible
- Never overuse - 1-2 per major section maximum

---

## Accessibility

### Contrast Ratios
- **Hemp Green on White**: AAA compliant
- **Soil Dark on Soft Cream**: AAA compliant
- **White on Hemp Green**: AA compliant (use for buttons)
- **White on Sky Blue**: AA compliant

### Best Practices
- Never use Wheat Gold text on Soft Cream backgrounds (poor contrast)
- Always use Soil Dark or Hemp Green for primary text
- Ensure all CTAs have sufficient color contrast
- Minimum touch target: 44x44px for mobile buttons

---

## Do's and Don'ts

### ✅ DO
- Keep the tone urgent but empowering
- Use real data and statistics
- Make CTAs obvious and green
- Emphasize how easy the process is
- Use agricultural/farming imagery
- Keep forms simple and fast

### ❌ DON'T
- Use corporate blue or cold colors as primary
- Over-complicate the user journey
- Use gradients excessively (solid colors preferred)
- Make users think too hard
- Use alarmist language that disempowers
- Add barriers to taking action

---

## Special Sections

### Hero Section
- Background: Dark gradient (Hemp Green to Soil Dark) OR solid Hemp Green
- Text: White
- CTA: Hemp Green button with white text (stands out even on dark bg with box shadow)

### Stats Counter
- Background: White
- Cards: Warm Cream with Sky Blue border accent
- Numbers: Hemp Green, large and bold

### Final CTA Section
- Background: Sky Blue (solid, no gradient)
- Text: White
- Button: Hemp Green (maintains brand consistency)

---

## File Naming Conventions
- Use kebab-case: `stand-for-hemp-logo.png`
- Include size in filename for images: `hero-background-1920x1080.jpg`
- Version important files: `brand-colors-v1.css`

---

## Notes for Developers (Claude Code)
When implementing this design:
1. Use the exact hex codes provided
2. Maintain the spacing and padding guidelines
3. Ensure mobile responsiveness (breakpoint at 768px)
4. Test all CTAs for sufficient contrast
5. Keep animations subtle (0.3s transitions)
6. Optimize for fast loading (system fonts, minimal dependencies)

---

**Last Updated**: November 2025
**Version**: 1.0
**Contact**: StandforHemp.com