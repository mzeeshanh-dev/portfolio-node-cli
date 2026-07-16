# @zeeshan-dev/cli

> Explore M. Zeeshan Haider's developer portfolio directly from your terminal. No installation required.

```bash
npx @zeeshan-dev/cli
```

## Features

- **Interactive Menu** — Navigate with arrow keys, explore everything
- **Live Data** — Projects, experience, and GitHub stats fetched from portfolio API
- **Offline Support** — Smart caching for offline/slow networks
- **5 Themes** — Dark (default), Light, Dracula, Nord, GitHub
- **`--latest` Flag** — Force-sync latest data
- **Easter Eggs** — Try `coffee`, `joke`, `42`, or `sudo hire zeeshan`
- **Analytics** — See which sections get the most attention (fully local, anonymous)
- **MOTD** — A new developer quote every day

## Quick Start

```bash
# Run directly (no install)
npx @zeeshan-dev/cli

# Force latest data
npx @zeeshan-dev/cli --latest

# Direct commands
npx @zeeshan-dev/cli about
npx @zeeshan-dev/cli projects
npx @zeeshan-dev/cli github
npx @zeeshan-dev/cli hire
npx @zeeshan-dev/cli resume
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

## Themes

- **Dark** — Portfolio default (deep black + blue)
- **Light** — Clean white + blue accent
- **Dracula** — Purple + cyan vampire vibes
- **Nord** — Arctic blue-gray
- **GitHub** — Familiar GitHub dark mode

## Development

```bash
# Clone
git clone https://github.com/mzeeshanh-dev/cli.git
cd cli

# Install dependencies
npm install

# Run in dev mode
npm run dev

# Build
npm run build

# Test locally (links globally)
npm link
zeeshan
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

## Tech Stack

- **TypeScript** + **ESM** — Strict, modern Node.js
- **Commander** — CLI routing
- **@clack/prompts** — Beautiful interactive menus
- **Chalk** — Terminal colors
- **Boxen** — Bordered boxes
- **Ora** — Spinners
- **Conf** — Persistent settings
- **Axios** — API requests

## Author

**M. Zeeshan Haider** — Full Stack Software Engineer

- Portfolio: [m-zeeshan-haider.vercel.app](https://m-zeeshan-haider.vercel.app)
- GitHub: [@mzeeshanh-dev](https://github.com/mzeeshanh-dev)
- Email: mzeeshanh.dev@gmail.com

## License

MIT
