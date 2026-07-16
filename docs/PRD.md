# Product Requirements Document (PRD)

## Product Name
`@zeeshan-dev/cli`

## Objective
To create a production-grade, interactive terminal companion to M. Zeeshan Haider's portfolio website. The CLI should allow recruiters and fellow developers to explore Zeeshan's projects, experience, skills, and GitHub stats directly from their terminal.

## Target Audience
- Recruiters evaluating technical skills.
- Developers looking for inspiration.
- Engineering Managers assessing production-readiness and code quality.

## Core Features (Phase 1 MVP)
1. **Interactive Menu**: Navigate through the portfolio using a clean, keyboard-driven interface (`@clack/prompts`).
2. **Live Data Fetching**: Pull data dynamically from the live portfolio's API (projects, experience, faqs) and GitHub API.
3. **Offline Fallback**: Cache data locally (`~/.zeeshan-cli/`) so the CLI works even without an internet connection.
4. **Theme Support**: Multiple color schemes including a default 'Dark' theme matching the web portfolio.
5. **Analytics**: Local, anonymous tracking of command usage to understand what users explore most.
6. **Easter Eggs**: Hidden commands for developer delight (e.g., `coffee`, `joke`, `sudo hire zeeshan`).
7. **MOTD**: A daily rotating developer quote on startup.

## Non-Functional Requirements
- **Performance**: Instant startup time. Use caching heavily. No massive ASCII art blocking the terminal.
- **Aesthetics**: Professional, clean, and minimal. Do not look like a "hacker script". Match the portfolio's premium feel.
- **Resilience**: Never crash on network failure. Always fall back gracefully.
- **Architecture**: Cleanly separated layers (Commands, UI, Services).

## APIs Consumed
- `GET https://m-zeeshan-haider.vercel.app/api/projects` (with local fallback if auth-protected)
- `GET https://m-zeeshan-haider.vercel.app/api/experience` (with local fallback if auth-protected)
- `GET https://m-zeeshan-haider.vercel.app/api/faqs`
- `GET https://m-zeeshan-haider.vercel.app/api/github`
- `GET https://api.github.com/users/mzeeshanh-dev` (Fallback if portfolio API fails)
