# KidLearn Design System

## Overview

KidLearn is a bright, chunky, and friendly design system built for children's educational apps targeting ages 5-12. Every element uses rounded, approachable shapes with generous sizing to ensure comfort and accessibility for young learners. The system prioritizes large touch targets, clear visual hierarchy, reward-oriented feedback, and COPPA-compliant patterns. Colors are vivid but carefully balanced to avoid sensory overload.

## Colors

- **Color Primary** `#EF4444`: Primary actions, highlights
- **Color Secondary** `#3B82F6`: Secondary actions, links
- **Color Tertiary** `#FACC15`: Rewards, stars, badges
- **Surface Base** `#FFFFFF`: Page background
- **Surface Highlight** `#FEF3C7`: Active lesson highlight
- **Color Success** `#22C55E`: Correct answer, completion
- **Color Warning** `#F59E0B`: Try again prompts
- **Color Error** `#EF4444`: Incorrect answer feedback
- **Color Info** `#3B82F6`: Hints, tips

## Typography

- **Headline Font**: Fredoka
- **Body Font**: Nunito
- **Mono Font**: Roboto Mono
- **text-hero**: Fredoka 48px bold, 1.2 line height
- **text-h1**: Fredoka 36px bold, 1.25 line height
- **text-h2**: Fredoka 28px semibold, 1.3 line height
- **text-h3**: Fredoka 22px semibold, 1.35 line height
- **text-body-lg**: Nunito 18px regular, 1.6 line height
- **text-body**: Nunito 16px regular, 1.6 line height
- **text-caption**: Nunito 14px semibold, 1.5 line height
- **text-mono**: Roboto Mono 14px regular, 1.5 line height

## Spacing

Base unit: **8px**. Use generous padding throughout to create breathing room for young users.

- **space-1**: 8px — Inline icon gaps
- **space-2**: 16px — Between label and input
- **space-3**: 24px — Card inner padding
- **space-4**: 32px — Between components
- **space-5**: 40px — Section padding
- **space-6**: 48px — Large section gaps
- **space-8**: 64px — Page-level vertical rhythm

## Border Radius

- **radius-sm**: 12px — Small elements, chips
- **radius-md**: 20px — Buttons, cards, inputs
- **radius-lg**: 28px — Large cards, modals
- **radius-pill**: 9999px — Pills, tags, small controls
- **radius-circle**: 50% — Avatars, icons

## Elevation

- **shadow-sm**: 2px offset, 4px blur, black at 8%.
- **shadow-md**: 4px offset, 12px blur, black at 12%.
- **shadow-lg**: 8px offset, 24px blur, black at 16%.
- **shadow-playful**: 6px offset, 0px blur, `#D1D5DB`.
- **shadow-focus**: 4px ring `#3B82F6` at 35%.

## Components

### Buttons

All buttons use at least 20px border radius, with a chunky pressed state that shifts down by 3px.

- **Primary**: `#EF4444` fill, white text.
- **Secondary**: `#3B82F6` fill, white text.
- **Ghost**: transparent fill, `#EF4444` text, 2px `#EF4444` border.
- **Destructive**: `#DC2626` fill, white text.

### Cards

Raised surface fill `#F9FAFB`, 2px border, 20px corners, 24px padding, chunky offset shadow.

### Inputs

20px border radius, 48px minimum height, 16px body font, focus ring in blue, forgiving error state in red.

### Chips

Pill radius, 14px semibold text, 36px height.

- **Complete**: `#DCFCE7` fill, `#166534` text.
- **Locked**: `#F3F4F6` fill, `#9CA3AF` text.
- **Active**: `#DBEAFE` fill, `#1E40AF` text.
- **New**: `#FEF3C7` fill, `#92400E` text.

### Lists

56px minimum row height, 16px horizontal padding, dividers, rounded container, icons placed left with 12px gap.

### Checkboxes And Radios

Large 28px controls, rounded checkbox corners, clear selected states, focus ring, and bounce animation on check.

### Tooltips

Dark tooltip fill, white text, rounded corners, short show/hide delay, shadow.

## Do's And Don'ts

1. Do ensure all interactive elements meet a minimum 48px touch target.
2. Do use simple, age-appropriate language.
3. Do incorporate reward animations for correct answers and milestones.
4. Don't use more than three bright colors in a single view.
5. Do maintain COPPA compliance.
6. Don't rely on text alone for navigation.
7. Do provide generous padding between interactive elements.
8. Don't use time pressure or countdown mechanics that could cause anxiety.
9. Do design forgiving error states.
10. Don't use thin fonts, low-contrast text, or small UI elements.
