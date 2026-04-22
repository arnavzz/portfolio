# Arnav Khamparia — Portfolio Revamp Brief
**For: claude.ai/design**
**Stack: React 18 + Vite + Tailwind CSS + Three.js / Spline**

---

## 1. Who Is This Portfolio For

Arnav Khamparia is an **AI/ML Engineer** with hands-on production experience building:
- AI Voice Agents (Google Gemini Live API) for a fintech startup (OTO Capital)
- LLM pipelines, RAG systems, LangGraph agentic workflows
- Medical imaging AI (published in Springer)
- Generative AI SEO tools

Target audience: **Recruiters at AI-first startups and product companies, senior engineers evaluating candidates, and research collaborators.**

The portfolio must immediately communicate: *"This person builds real AI systems, not just hobby projects."*

---

## 2. Current State Audit

### Tech Stack (existing)
- React 18 + Vite + Tailwind CSS
- Vanta.js NET effect on Hero (interactive green particle network)
- CSS 3D transforms on project cards and skill pods
- Framer Motion installed — **but completely unused**
- IntersectionObserver fade-in animations
- Dark/light theme toggle (dark-first: `#0f172a` dark, `#f8fafc` light)
- Accent color: emerald green `#10b981`

### Sections (existing)
| Section | Status |
|---|---|
| Header (fixed, glass) | ✅ Good foundation |
| Hero (Vanta.js network bg) | ⚠️ Needs typing animation, stronger CTA |
| About (photo + bio) | ⚠️ Generic text, no stats |
| Projects (4 cards, grid) | ⚠️ Card description bug, no live demo previews |
| Skills (4 category pods) | ⚠️ Text-only, no visual hierarchy |
| Contact (form + social links) | ⚠️ Form is fake (alert only), wrong resume filename |
| Footer | ✅ Minimal, fine |

### Critical Missing Sections (not in portfolio, but in resume)
- ❌ **Experience / Timeline** — 2 internships are completely absent from the portfolio
- ❌ **Publications** — Springer book chapter is a major credibility signal, missing
- ❌ **Accolades / Leadership** — AI Club Technical Lead + Alumni Community not shown

### Content Bugs to Fix
1. LangGraph project description accidentally contains ESRGAN copy-paste text ("Developed an Enhanced Super-Resolution GAN..."). Fix it to match the actual project.
2. Contact section links to `Resume_Arnav Khamparia.pdf` — actual file is `Arnav_khamparia_cv.pdf`. Update the href.
3. Contact email shows `arnavk2002@gmail.com` but resume says `arnav.worko@gmail.com`. Unify these.
4. Skills section has a typo: "Genrative AI" → "Generative AI".
5. About bio mentions "writing technical blogs" but no blog link exists — either add the link or remove the reference.

---

## 3. Design Direction

### Visual Identity
- **Dark-first design** (primary mode). Light mode as secondary.
- Color palette:
  - Background: `#0a0f1e` (slightly deeper than current `#0f172a` for more richness)
  - Surface/cards: `#111827` with glassmorphism borders
  - Accent primary: `#10b981` (emerald — keep, it's distinctive)
  - Accent secondary: `#6366f1` (indigo — for variety, highlights publications/research work)
  - Text primary: `#f1f5f9`
  - Text muted: `#64748b`
- **Typography**: Keep Inter. Add `Fira Code` or `JetBrains Mono` for code-style labels (skill tags, tech stack badges) to reinforce the engineering identity.
- **Aesthetic**: Glassmorphism + subtle grid/dot pattern backgrounds + glowing borders on hover. Think Linear.app or Vercel's homepage energy — minimal but technically impressive.

### Motion Philosophy
- Use **Framer Motion** (already installed) for all entrance animations — replace the current CSS IntersectionObserver approach.
- Use `staggerChildren` for lists (skills, project cards).
- Use `layoutId` for smooth section transitions.
- Keep animations snappy: `duration: 0.4–0.6s`, `ease: [0.22, 1, 0.36, 1]` (expo out feel).
- No bouncy or playful easing — keep it sharp and professional.

---

## 4. Section-by-Section Redesign

---

### 4.1 Hero Section — MAJOR UPGRADE

**Goal**: First impression that immediately says "AI engineer who builds serious things."

**Layout**: Full-viewport, centered, dark background.

**Elements**:
1. **Spline 3D Scene (background)** — Embed a Spline scene (spline.design) as an `<iframe>` or via `@splinetool/react-spline`. Suggested scene options:
   - Abstract neural network / brain mesh (on-brand for ML)
   - Floating geometric shapes (low-key, professional)
   - Particle sphere / data globe
   - Use community Spline scene: search "neural network" or "AI brain" on spline.community
   - The scene should be subtle — slightly blurred or low-opacity so text remains readable.

2. **Greeting chip**: Small pill badge above the name — `🤖 Available for full-time roles` or `Currently @ OTO Capital`

3. **Name**: Keep large (`text-6xl md:text-8xl`), bold. Add a subtle gradient:
   ```
   background: linear-gradient(135deg, #f1f5f9 40%, #10b981 100%);
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
   ```

4. **Typewriter animation** below the name cycling through:
   - `"ML Engineer"`
   - `"AI Systems Builder"`
   - `"LLM Architect"`
   - `"Published Researcher"`
   Use `framer-motion` or a lightweight lib like `react-type-animation`.

5. **Tagline**: Keep current tagline text but increase contrast.

6. **Dual CTA buttons**:
   - Primary: `View My Work` → scrolls to Projects (filled emerald)
   - Secondary: `Download Resume` → direct PDF download (ghost/outlined)

7. **Scroll indicator**: Animated bouncing chevron at the bottom of the hero.

8. **Stats bar** (horizontal, below CTA or at bottom):
   ```
   2+ Years Experience  |  4 Projects  |  1 Publication  |  2 Internships
   ```

---

### 4.2 About Section — MODERATE UPGRADE

**Layout**: Keep 2-column (photo left, text right). Upgrade the content and styling.

**Photo**: Add a glowing emerald border ring animation on the profile image:
```css
box-shadow: 0 0 0 4px #10b981, 0 0 40px rgba(16, 185, 129, 0.3);
```
Consider a subtle rotation animation on hover.

**Bio text**: Rewrite to be more punchy and specific (see Section 6 for new copy).

**Add below bio — Quick Stats row** (4 cards):
```
[ 2+ Years in AI ]  [ 2 Internships ]  [ 1 Publication ]  [ 4+ Projects ]
```
Each stat card animates a number counter from 0 upward when it enters viewport (use `framer-motion` `useMotionValue` + `useTransform`).

**Add education badge** — a small card showing:
```
🎓 B.Tech in AI/ML
Madhav Institute of Technology and Science
2021 – 2025 | Gwalior, India
```

---

### 4.3 Experience Section — NEW (CRITICAL)

This section is completely absent from the current portfolio despite being the strongest credibility signal. Add it between About and Projects.

**Component**: Vertical interactive timeline.

**Design**:
- Centered vertical line (glowing emerald `#10b981`) running top to bottom
- Each experience card alternates left/right on desktop, stacks on mobile
- Cards use glassmorphism styling
- Animate in with `framer-motion` `whileInView` from the side (left card slides from left, right card from right)
- Active/hovered card gets a glowing border

**Entries** (from resume):

**Entry 1 — OTO Capital** (Current)
```
Role: AIML Intern
Company: OTO Capital
Duration: Nov 2025 – Present
Location: Bengaluru, India
Badge: [CURRENT]  ← pulsing green dot

Bullets:
• Engineered prompt systems for a production AI Voice Agent built on Google Gemini Live API for ultra-low latency real-time borrower conversations
• Designed an AI-driven outreach orchestration engine that autonomously decides the best channel (AI Call / WhatsApp / SMS / Manual) per borrower based on behavior signals
• Built a disposition analysis system processing call recordings → structured insights → feedback loop, creating a self-improving AI with no human intervention
• Owned end-to-end decisions on AI behavior, escalation, and learning across the entire collections pipeline

Tech used: [Gemini Live API] [Prompt Engineering] [LLM] [Python] [Fintech]
```

**Entry 2 — Vivada Tech**
```
Role: Machine Learning Intern
Company: Vivada Tech
Duration: May 2024 – Aug 2024
Location: Chennai, India

Bullets:
• Developed and optimized ML models using prompt engineering, improving SDK performance by 20% for AI evaluation tools
• Designed and integrated REST APIs and SDKs, reducing model deployment time by 15%
• Authored technical documentation, increasing team onboarding efficiency by 30%

Tech used: [Python] [REST APIs] [Prompt Engineering] [SDK] [Cloud ML]
```

---

### 4.4 Projects Section — MODERATE UPGRADE

**Layout**: Keep 2-3 column grid. Upgrade card design.

**Card redesign**:
- Add a **colored top border** per project (vary the accent: emerald for ML, indigo for AI/research, amber for tools)
- Add **"Live Demo"** and **"GitHub"** icon buttons in bottom-right corner
- Add a **"Featured"** badge on the Springer publication project
- Subtle **image overlay on hover** showing a "View Project →" CTA
- Tech stack badges should use `JetBrains Mono` font and a slightly different bg (`#1e293b` vs card bg)

**Fix project descriptions** (see Section 2 bugs).

**Projects to show** (all 4 from resume):
1. LangGraph Agentic Workflow — fix description, add Streamlit link
2. Super Resolution (ESRGAN) — if no live link, add GitHub link or mark as "Research"
3. Liver Tumor Segmentation — mark with "📄 Published · Springer" badge
4. Generative AI SEO Augmenter — add live link (augai.netlify.app)

**Add a "View All Projects" button** below the grid linking to GitHub profile.

---

### 4.5 Skills Section — MAJOR UPGRADE

**Current**: Text badges in 4 category pods with basic 3D hover. Works but feels static.

**Option A — Skill Orbit / Tag Cloud** (more visually impressive):
- Use a circular orbital layout where skill categories orbit around a central node
- Achievable with CSS `transform: rotate()` + `translateX()` + counter-rotate for text
- Or use a canvas-based tag cloud lib

**Option B — Enhanced Pods with Icons + Progress Indicators** (safer, cleaner):
- Keep the 4-category layout but add:
  - SVG icons per skill (use `react-icons` or custom SVGs)
  - Visual proficiency indicator (dots: ●●●○○ or a thin progress bar)
  - Skill badges with tech logo icons (TensorFlow logo, PyTorch logo, etc.)

**Recommended**: Option B — it's cleaner, more readable for recruiters, and less gimmicky.

**Skill categories** (updated from resume):
```
Machine Learning: TensorFlow, PyTorch, Scikit-learn, LangChain, LangGraph, LLMs, RAG, Prompt Engineering, BERT, GPT, T5

Programming: Python, SQL, C++

Tools & Platforms: Git, Streamlit, REST APIs, Postman, AWS

Domains: Deep Learning, Generative AI, NLP, Computer Vision, Medical AI, Data Structures & Algorithms
```

---

### 4.6 Publications Section — NEW

Add a dedicated Publications section between Skills and Contact. This is a strong differentiator — very few ML interns have Springer publications.

**Design**: Single card or small grid (1 publication currently, but design for expansion).

**Card structure**:
```
[ 📄 icon ]  Liver Tumor Segmentation with U-Net, V-Net and AH-Net Using MONAI
             Springer Book Series · 2024

             Co-authored a comparative study of U-Net, V-Net, and AH-Net for liver CT scan
             segmentation using the MONAI framework, achieving a top Dice score of 0.93.

             [ View Publication → ]   [ Dice Score: 0.93 ] badge
```

**Styling**: Use the indigo accent `#6366f1` for this section to distinguish it from project work. Add a subtle "peer-reviewed" or "published" seal icon.

---

### 4.7 Accolades / Leadership Section — NEW (can merge with Publications)

Add below Publications, or merge into a single "Recognition" section.

**Entries**:

```
🏆 Technical Lead — Artificial Intelligence Club
   Led 10+ team projects and workshops on AI/ML
   Mentored 20+ students in Python and TensorFlow
   Resulted in successful project deployments

📢 Content Coordinator — MITS Alumni Community
   Developed content strategies for newsletters and social media
   Increased alumni engagement by 40% through targeted campaigns
```

**Design**: 2-column card layout, icon + title + description. Keep it compact.

---

### 4.8 Contact Section — MODERATE UPGRADE

**Fix**:
- Update resume download href from `Resume_Arnav Khamparia.pdf` → `Arnav_khamparia_cv.pdf`
- Unify email address (pick one: `arnav.worko@gmail.com` from resume)
- Replace the fake `alert()` form submission with a real service:
  - **Formspree** (free, zero backend): `action="https://formspree.io/f/YOUR_ID"`
  - Or **EmailJS** for React-native email sending without a backend

**Design upgrades**:
- Add a subtle animated background gradient in this section (slow-moving aurora effect using CSS)
- Add availability status: `🟢 Open to opportunities` displayed prominently
- Add a response time note: "I typically respond within 24 hours"

---

## 5. 3D Elements — Spline Integration Guide

**What is Spline**: A browser-based 3D design tool. You can create scenes and embed them via `<iframe>` or `@splinetool/react-spline` npm package.

### Recommended Placements

**Option 1 — Hero Background (Primary recommendation)**
```jsx
import Spline from '@splinetool/react-spline';

// In Hero component:
<div className="absolute inset-0 z-0 opacity-40">
  <Spline scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode" />
</div>
```
Use a neural network, particle sphere, or abstract AI-themed scene.
Keep opacity at 30-50% so it doesn't compete with text.

**Option 2 — About Section Decoration**
Small floating 3D brain or geometric shape beside the profile photo.

**Option 3 — Skills Section**
3D rotating sphere with skill names mapped on surface (complex — only do if time allows).

### Free Spline Scenes to Search
- Go to spline.community or spline.design/community
- Search: "neural network", "particle sphere", "abstract geometry", "DNA helix", "data visualization"
- Clone a community scene and customize colors to match emerald `#10b981` + dark `#0a0f1e`

### Install
```bash
npm install @splinetool/react-spline @splinetool/runtime
```

### Performance Note
Spline scenes can be heavy (1–5MB). Use `<Suspense>` with a gradient fallback, and lazy-load the Spline component. Consider using the Vanta.js NET effect as fallback if Spline fails to load.

---

## 6. Content Rewrites

### Hero Tagline (rewrite)
```
Current: "Engineering Intelligence with purpose"
Better:  "Building AI Systems That Work in Production"
         or
         "From Prompt Engineering to Production AI"
```

### About Bio (rewrite — more specific and punchy)
```
I'm Arnav — an AI/ML Engineer who builds systems that actually ship. 

Currently at OTO Capital, I'm engineering production AI Voice Agents using 
Google Gemini Live API, designing self-improving feedback loops, and owning 
end-to-end decisions on how AI behaves at scale across a real fintech 
collections pipeline.

My work sits at the intersection of ML engineering and product: I care about 
models that perform well in the real world, not just on benchmarks. My toolkit 
spans LLMs, RAG architectures, LangGraph workflows, and computer vision — 
backed by a published study in Springer on medical image segmentation.

I'm driven by problems where AI can reduce friction, create clarity, and 
generate measurable impact. If you're building something ambitious in that space, 
I'd love to talk.
```

---

## 7. Implementation Priority Order

Build in this order for maximum impact:

| Priority | Change | Effort |
|---|---|---|
| 🔴 P0 | Fix content bugs (wrong resume link, description copy-paste, typo) | 30 min |
| 🔴 P0 | Add Experience/Timeline section | 3–4 hrs |
| 🟠 P1 | Add typing animation to Hero | 1 hr |
| 🟠 P1 | Add Publications + Accolades sections | 2–3 hrs |
| 🟠 P1 | Wire up real contact form (Formspree) | 1 hr |
| 🟡 P2 | Integrate Spline 3D in Hero | 2–3 hrs |
| 🟡 P2 | Add animated stat counters in About | 2 hrs |
| 🟡 P2 | Upgrade Skills section with icons | 2 hrs |
| 🟢 P3 | Rewrite bio and tagline copy | 30 min |
| 🟢 P3 | Add availability badge + aurora bg in Contact | 1 hr |
| 🟢 P3 | Add "View All Projects" GitHub link | 15 min |

---

## 8. What NOT to Change

- The **Vanta.js NET effect** is genuinely impressive and on-brand. Keep it. If Spline is added, layer Spline behind it or replace Vanta only on mobile for performance.
- The **dark navy `#0f172a` + emerald `#10b981`** color combo is strong and distinct. Don't chase trends by switching to purple/blue gradients — the green is memorable.
- The **glass-effect nav** with scroll-aware background. It works well.
- The **3D CSS hover effects** on project cards and skill pods. These are a nice touch.
- **Dark mode toggle**. Keep it — shows technical polish.

---

## 9. Tech Dependencies to Add

```json
{
  "@splinetool/react-spline": "^2.2.6",
  "@splinetool/runtime": "^1.5.5",
  "react-type-animation": "^3.2.0",
  "react-icons": "^5.0.0",
  "formspree": "(via HTML form action, no install needed)"
}
```

Framer Motion is already installed (`^10.18.0`) — just needs to be used.

---

## 10. Final Checklist for the Revamp

- [ ] Fix: LangGraph project description (remove ESRGAN copy-paste)
- [ ] Fix: Resume download link → `Arnav_khamparia_cv.pdf`
- [ ] Fix: Unify email address to `arnav.worko@gmail.com`
- [ ] Fix: "Genrative AI" typo → "Generative AI"
- [ ] Add: Experience / Timeline section (OTO Capital + Vivada Tech)
- [ ] Add: Publications section (Springer paper)
- [ ] Add: Accolades / Leadership section
- [ ] Add: Typing animation on Hero
- [ ] Add: Spline 3D scene in Hero background
- [ ] Add: Stat counters in About (animated)
- [ ] Add: Real contact form via Formspree
- [ ] Add: Availability badge ("Open to opportunities")
- [ ] Upgrade: Skills section with icons
- [ ] Upgrade: About bio copy
- [ ] Upgrade: Hero tagline and dual CTA
- [ ] Upgrade: Profile image with glowing border ring

---

*Document prepared by Claude Code | April 2026*
*Portfolio: https://arnavkhamparia.netlify.app/*
*Resume analyzed: Arnav_khamparia_cv.pdf*
