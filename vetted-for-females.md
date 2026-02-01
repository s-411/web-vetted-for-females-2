# Layout Guide: VETTED (Female Version)

This document describes the layout and structure for a relationship vetting app designed for women evaluating male partners. It focuses on **layout and user flow** - use your existing design system for colors, fonts, and styling.

---

## App Overview

A simple, focused relationship vetting tool with four core features:
- **Green Flags** (20 items) - positive indicators
- **Red Flags** (23 items) - warning signs
- **Dealbreakers** (15 items) - instant disqualifiers with explanations
- **Investment Tracker** (10 stages) - measuring his commitment level

**NOT included:** photos, interview questions, timeline/journal, notes. Keep it minimal and privacy-focused.

---

## Dashboard (Home Page)

The dashboard shows a grid of profile cards for all active profiles.

**Top of page:**
- Page title (something like "Your Profiles")
- Count of how many profiles exist
- Button to add a new profile

**Optional filter/sort bar:**
- Filter by grade
- Sort by date or name

**Main content:**
- Responsive grid of profile cards
- Single column on mobile, two columns on tablet, three on desktop
- Each card shows: the person's name, their current letter grade, maybe a small status indicator

**Empty state:**
- When no profiles exist, show a friendly message encouraging them to add their first profile

**Clicking a card** takes you into that profile's detail page.

---

## Profile Detail Page

This is the main hub when viewing a specific profile. The layout has distinct sections.

### Header Section (Top)

**Left side:**
- Breadcrumb navigation (Home / Profile Name)
- The person's name (make it editable inline if possible)
- Maybe a status badge showing their current state

**Right side:**
- Action buttons: Edit, Archive, Share (if you implement sharing)
- Keep these as icon buttons or a dropdown menu to save space

### Assessment Section

**Overall Grade Display:**
- Large, prominent letter grade (A+ through F)
- This is the headline metric - make it visually prominent

**Score Breakdown:**
- Three horizontal progress bars or score indicators:
  1. Green Flags: X of 20 checked
  2. Red Flags: X of 23 checked
  3. Dealbreakers: X of 15 checked
- Each shows the count and a visual fill indicator

**Investment Level:**
- A display showing investment progress: X of 10 stages complete
- Could be a progress bar, numbered indicator, or simple fraction

### Action Cards Section

A grid of cards that let the user navigate to different sections. Layout as 2 columns on desktop, stacking on mobile.

**Four action cards:**

1. **Vetting / Green Flags**
   - Icon representing positive/checkmarks
   - Title: "Green Flags" or "Positive Signs"
   - Shows count: "X of 20"
   - Links to the green flags checklist

2. **Red Flags**
   - Icon representing warning/caution
   - Title: "Red Flags" or "Warning Signs"
   - Shows count: "X of 23"
   - Links to the red flags checklist

3. **Dealbreakers**
   - Icon representing stop/danger
   - Title: "Dealbreakers"
   - Shows count: "X of 15"
   - Links to the dealbreakers checklist

4. **Investment Tracker**
   - Icon representing growth/progress
   - Title: "His Investment" or "Investment Ladder"
   - Shows count: "X of 10"
   - Links to the investment stages page

---

## Green Flags Page

A checklist page for tracking positive indicators.

**Header:**
- Breadcrumbs
- Title: "Green Flags"
- Progress indicator: X of 20

**Content:**
- List of 20 checkboxes with labels
- Checking a flag saves immediately
- Visual feedback when checked (checkmark, color change)

**The 20 Green Flags:**

1. Consistent communication (texts back reliably, doesn't disappear)
2. Makes concrete plans in advance (not "let's hang sometime")
3. Introduces you to his friends
4. Introduces you to his family
5. Has close male friendships
6. Healthy relationship with his mother (close but not enmeshed)
7. Takes accountability when he's wrong
8. Remembers details you've told him
9. Shows up when he says he will
10. Asks about your life and listens
11. Has long-term goals and works toward them
12. Financially stable/responsible
13. Respects your boundaries without pushback
14. Comfortable with emotional conversations
15. Happy to define the relationship
16. Plans dates, not just "hanging out"
17. Speaks well of past relationships (or neutrally)
18. Has his own hobbies and interests
19. Supports your goals and ambitions
20. Consistent behavior (same person in public and private)

---

## Red Flags Page

A checklist page for tracking warning signs.

**Header:**
- Breadcrumbs
- Title: "Red Flags"
- Progress indicator: X of 23

**Content:**
- List of 23 checkboxes with labels
- Visual styling that feels more cautious than green flags

**The 23 Red Flags:**

Inconsistent communication (hot and cold)
Avoids making plans in advance
Vague about what he's looking for
Talks badly about all his exes
Love bombing early (excessive gifts, "I've never felt this way")
Future faking (big promises, no follow-through)
Deflects or gets defensive when you raise concerns
Gaslighting (makes you question your own memory/perception)
No close friendships
Still entangled with an ex
Hides his phone or gets weird about it
Only available on his schedule
Dismisses your feelings as "overreacting"
Financially irresponsible (always broke, bad with money)
Excessive drinking or substance use
Anger issues (road rage, snapping at service workers)
Different person around his friends vs. with you
Pressures you sexually
Compares you to other women
Keeps you separate from his life

---

## Dealbreakers Page

A checklist page for absolute disqualifiers. Each item has an explanation that can be expanded.

**Header:**
- Breadcrumbs
- Title: "Dealbreakers"
- Progress indicator: X of 15

**Content:**
- List of 15 items
- Each item has: checkbox, label, and expandable explanation
- Tap/click to expand and see the "why" behind each dealbreaker
- More serious visual treatment than red flags

**The 15 Dealbreakers (with explanations):**

1. **History of cheating**
   - If he's cheated before, statistics show he's significantly more likely to cheat again. Past behavior is the best predictor of future behavior, especially with infidelity.

2. **Physical aggression or violence (any instance)**
   - Any physical aggression is an immediate dealbreaker. It almost always escalates over time. There is no acceptable level of physical violence in a relationship - zero tolerance.

3. **Emotional abuse patterns**
   - Consistent patterns of manipulation, control, criticism, or emotional cruelty indicate deep-seated issues. Emotional abuse often precedes or accompanies physical abuse and causes lasting psychological harm.

4. **Narcissistic traits (no empathy, everything is about him)**
   - True narcissistic traits mean he's incapable of genuine partnership. Everything will revolve around his needs, your feelings won't matter, and he'll never truly see you as an equal.

5. **Substance addiction**
   - Active addiction means you'll always come second to the substance. Addicts in active addiction cannot be reliable partners. They need to be in solid recovery before being relationship material.

6. **Still legally married or separated**
   - If he's not fully divorced, he's not available. "Separated" is often code for "still figuring things out with my wife." Don't be part of someone else's marriage problems.

7. **Secret children**
   - If he hid children from you, what else is he hiding? This level of deception about something so significant indicates a fundamental dishonesty that will pervade the relationship.

8. **Lies about significant things**
   - Major lies about his past, his situation, or important facts destroy the foundation of trust. If he lies about big things, you can never be sure what else isn't true.

9. **Financial abuse (controls money, won't let you work)**
   - Financial control is a form of abuse designed to create dependency. If he tries to control your money or prevent you from working, he's trying to trap you.

10. **Isolates you from friends/family**
    - Isolation is a classic abuse tactic. If he's trying to separate you from your support network, he's setting up a dynamic where you're dependent on him and can't easily leave.

11. **Threatens self-harm to manipulate you**
    - Using threats of self-harm to control your behavior is emotional manipulation. It's not love - it's hostage-taking. This is a serious red flag for an abusive dynamic.

12. **Has cheated WITH you on someone else**
    - If he cheated with you, he'll cheat on you. His willingness to be unfaithful shows his values around commitment. You're not special enough to change this pattern.

13. **Criminal history (violent crimes)**
    - A history of violent crimes indicates a capacity for violence. While people can change, violent tendencies are deeply concerning for intimate relationships where you're vulnerable.

14. **Refuses therapy when clearly needed**
    - If he has obvious issues but refuses to work on them, he's not committed to growth. You can't fix him, and he's showing you he won't fix himself. This will never improve.

15. **Addiction to gambling or porn affecting the relationship**
    - These addictions destroy relationships through financial ruin and intimacy problems. If the addiction is affecting your relationship and he won't address it, it will only get worse.

---

## Investment Tracker Page

A page showing the 10 stages of his investment/commitment in the relationship.

**Header:**
- Breadcrumbs
- Title: "Investment Tracker" or "His Investment"
- Progress: X of 10 stages

**Content:**
- Vertical list of 10 stages displayed as cards
- Each card shows: stage number, title, description, checkbox
- Completed stages should look visually distinct from incomplete ones
- Stages are meant to be roughly sequential (stage 1 before stage 2, etc.)

**The 10 Investment Stages:**

1. **Consistent daily communication**
   - He texts or calls you every day. Communication is reliable and you're not left wondering when you'll hear from him.

2. **Makes plans 3+ days in advance**
   - He plans dates ahead of time rather than last-minute invites. Shows he's thinking about you and prioritizing time together.

3. **You've met his close friends**
   - He's introduced you to his friend group. He's not keeping you separate from his social life.

4. **He's met your close friends**
   - He's made an effort to meet and spend time with your friends. He cares about being part of your life.

5. **Deleted dating apps together**
   - You've both agreed to delete dating apps. You're both off the market and investing in each other exclusively.

6. **Defined the relationship (exclusive)**
   - You've had the conversation and agreed you're in an exclusive relationship. No ambiguity about your status.

7. **You've met his family**
   - He's introduced you to his parents, siblings, or other important family members. He sees you as part of his future.

8. **He's met your family**
   - He's made an effort to meet your family. He's invested in your whole life, not just the parts that are convenient.

9. **Discusses future together (travel, living, goals)**
   - He talks about the future and includes you in it. Whether it's trips, living together, or long-term goals, he sees you as part of his future.

10. **Integrated into each other's lives**
    - Your lives are meaningfully intertwined. You have routines together, know each other's schedules, and have become part of each other's daily life.

---

## Grading System

The app calculates a letter grade based on the flag ratios.

**Grade Scale:**
- **A+** - Exceptional, minimal concerns
- **A** - Strong candidate, very few concerns
- **B** - Good potential, some areas to monitor
- **C** - Notable concerns, proceed carefully
- **D** - High risk, significant red flags
- **F** - Not recommended, major dealbreakers

**Basic Calculation Logic:**
- Any 5+ dealbreakers = F
- Less than 50% green OR 50%+ red OR 4+ dealbreakers = D
- 50%+ green, less than 50% red, 2-3 dealbreakers = C
- 60%+ green, less than 40% red, 0-1 dealbreakers = B
- 70%+ green, less than 30% red, 0 dealbreakers = A
- 80%+ green, less than 20% red, 0 dealbreakers = A+

---

## Routes/Pages Summary

```
/               Dashboard - grid of profile cards
/profile/:id    Profile detail - overview with grade, stats, action cards
/profile/:id/green-flags     Green flags checklist
/profile/:id/red-flags       Red flags checklist
/profile/:id/dealbreakers    Dealbreakers checklist
/profile/:id/investment      Investment tracker
/archives       Archived profiles (soft-deleted)
/settings       App settings
```

---

## Key Layout Principles

1. **Dashboard is a grid** - Cards representing each profile, responsive columns

2. **Profile page is a hub** - Shows summary stats at top, then action cards that link deeper

3. **Checklist pages are simple** - Header with progress, then a scrollable list of checkboxes

4. **Investment is sequential** - Displayed as a vertical ladder/timeline of stages

5. **Mobile-first** - Everything stacks vertically on mobile, expands to columns on larger screens

6. **Immediate feedback** - Checking a box saves instantly, scores update in real-time

---

## What NOT to Include

- No photo uploads or galleries
- No interview questions section
- No timeline/journal feature
- No notes section
- No sharing feature (unless you want it later)
- Keep it focused on the four core features: green flags, red flags, dealbreakers, and investment tracking

---

## Privacy Considerations

This is sensitive personal data. Consider:
- Local-only storage option
- No profile photos of the men being evaluated
- Clear data deletion options
- No analytics or tracking beyond what's necessary
- Encrypted data at rest if using cloud storage

---

*Use this layout guide to build a clean, focused vetting tool. The design and styling should follow your existing design system - this document only describes structure and content.*
