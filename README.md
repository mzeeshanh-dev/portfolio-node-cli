
## Preview

<img width="640" height="360" alt="demo" src="https://github.com/user-attachments/assets/77f77129-29c5-4c29-9e5e-c02fcfc86ffc" />

# @zeeshan-dev/software-engineer

> Explore M. Zeeshan Haider's developer portfolio directly from your terminal. No installation required.

```bash
npx @zeeshan-dev/software-engineer
```

## Features

- **Interactive Menu** — Navigate with arrow keys, explore everything
- **Live Data** — Projects, experience, and GitHub stats fetched from portfolio API
- **Offline Support** — Smart caching for offline/slow networks
- **`--latest` Flag** — Force-sync latest data
- **Cross-Platform** — Graceful fallback for terminals without Unicode support

## Usage

There are two ways to use this CLI: running it directly via `npx` (no installation required) or installing it globally on your system.

### Option 1: Run directly with npx (Recommended)
You can run the portfolio instantly without installing anything permanently:

```bash
npx @zeeshan-dev/software-engineer
```

### Option 2: Install Globally
If you want to keep the CLI on your machine and run it anywhere using a simple command, install it globally via npm:

```bash
# Install globally
npm install -g @zeeshan-dev/software-engineer

# Run the CLI
zeeshan-dev
```

### Direct Commands & Flags
Whether using `npx @zeeshan-dev/software-engineer` or the global `zeeshan-dev` command, you can pass direct commands and flags to skip the menu:

```bash
# Force fetch the latest data instead of using cache
zeeshan-dev --latest

# Go directly to specific sections
zeeshan-dev projects
zeeshan-dev github
zeeshan-dev hire
zeeshan-dev contact
```

## Available Commands

| Command | Description |
|---------|-------------|
| `about` | Who am I — role, company, philosophy |
| `projects` | Interactive project explorer with live demo links |
| `experience` | Work experience & education timeline |
| `skills` | Tech stack across 4 categories |
| `github` | Live GitHub stats, repos, languages |
| `resume` | Opens resume PDF in your browser |
| `contact` | Email, phone, social links |
| `hire` | "Let's build something awesome" |
| `timeline` | Career journey visualization |
| `theme` | Switch between 5 color themes |
| `settings` | Config, analytics, cache management |
| `update` | Force-sync all data from portfolio |


## Development

```bash
# Clone
git clone https://github.com/mzeeshanh-dev/portfolio-node-cli
cd portfolio-node-cli

# Install dependencies
npm install

# Run in dev mode
npm run dev

# Build
npm run build

# Test
npm run test

# Test locally (links globally)
npm link
zeeshan-dev
```

## Testing

This CLI uses `vitest` for fast and reliable unit testing. We have implemented tests for API services, caching mechanisms, UI styling utilities, and command logic to ensure nothing breaks during future updates. 

Run all tests:
```bash
npm run test
```

## Architecture

```
src/
├── index.ts          # Entry point (Commander + menu loop)
├── commands/         # Each command = 1 file
├── services/         # API fetching, cache, config, analytics
├── ui/               # Banner, colors, menu, spinner, animations
├── types/            # TypeScript interfaces
└── data/             # Fallback JSON data
```

## Design Principles & Tech Stack

This package was built focusing on **SOLID**, **KISS**, and **DRY** principles. We intentionally avoided bloated frameworks like NestJS or React to keep the CLI lightweight and fast.

- **TypeScript** + **ESM** — Strict, modern Node.js
- **Commander** — CLI routing and argument parsing
- **@clack/prompts** — Beautiful interactive menus (Replaced older libraries to avoid redundancy)
- **Chalk** — Terminal colors (No background colors to preserve terminal transparency)
- **Boxen** — Bordered boxes
- **Ora** — Spinners
- **Conf** — Persistent settings
- **Axios** — API requests
- **is-unicode-supported** — Detects terminal capabilities to fallback to simple ASCII instead of Unicode when necessary, providing a polished experience across all OS.
- **Vitest** — High performance unit testing
## Author

**M. Zeeshan Haider** — Full Stack Software Engineer

- Portfolio: [m-zeeshan-haider.vercel.app](https://m-zeeshan-haider.vercel.app)
- GitHub: [@mzeeshanh-dev](https://github.com/mzeeshanh-dev)
- Email: mzeeshanh.dev@gmail.com

## License

MIT
