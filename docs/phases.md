# Phases & Roadmap

## Phase 1: MVP (Completed)
- Project setup (ESM, TypeScript, tsup).
- Interactive menu system (`@clack/prompts`).
- Core commands: `about`, `projects`, `experience`, `skills`, `github`, `contact`, `hire`, `timeline`.
- Theme system with 5 color palettes.
- Local caching (`~/.zeeshan-cli/`).
- Local analytics tracking.
- Easter eggs (`coffee`, `joke`, `42`, `sudo hire zeeshan`).
- Fallback data for auth-protected endpoints.

## Phase 2: Smart Features (v1.1)
- **Background Sync**: Silently fetch updates in the background while the user navigates the menu.
- **Sound Toggle**: Optional sound effects for navigation and success states.
- **Changelog Command**: Show what's new in the CLI (`zeeshan changelog`).
- **NPM Scope Deployment**: Officially publish to npm under `@zeeshan-dev/cli`.

## Phase 3: Premium Features (v1.2+)
- **Roadmap Command**: Show what Zeeshan is currently learning or building.
- **Expandable Tech Stack**: Drill down into specific skills to see projects related to that skill.
- **Terminal Screenshots**: Generate a shareable image of a specific CLI output.
- **Public API Refactor**: Update the main Next.js portfolio to expose dedicated public API routes for the CLI, removing the need for hardcoded fallbacks.
