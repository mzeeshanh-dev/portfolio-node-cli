# Design System

The CLI design system is heavily inspired by Zeeshan's Next.js web portfolio to ensure a cohesive brand experience.

## Core Philosophy
"Professional > Flashy". The CLI should feel like a premium developer tool (like `vercel cli` or `gh cli`), not an over-the-top hacker script.

## Theme Architecture

Themes are defined in `src/ui/colors.ts`. The default is **Dark**.

### Dark Theme (Default)
Extracted from portfolio's `tailwind.config.ts`:
- **Background**: `#050505` (Terminal default, we don't force bg color to maintain transparency)
- **Primary / Accent**: `#3b82f6` (Blue)
- **Secondary**: `#94a3b8` (Slate)
- **Text**: `#f8fafc` (White)

### Other Themes
- **Light**: Clean white background with blue accents.
- **Dracula**: Purple and cyan vibes.
- **Nord**: Cool, arctic blue-gray palette.
- **GitHub**: Familiar GitHub dark mode colors.

## UI Components
- **Banners**: Used for the main header and the `hire` command. Styled using `boxen` with rounded or bold borders.
- **Dividers**: Simple horizontal rules (`─────`) using the theme's border color.
- **Spinners**: Used during data fetching (`ora`), colored cyan.
- **Interactive Prompts**: Standardized using `@clack/prompts` for a modern, sleek selection experience.

## Typography
While terminals don't support custom fonts (like the portfolio's Plus Jakarta Sans), we simulate hierarchy using:
- **Bold White**: Main headings, project titles, company names.
- **Muted/Dim**: Descriptions, dates, secondary information.
- **Theme Primary**: Section headers, highlight values (e.g., stats).
