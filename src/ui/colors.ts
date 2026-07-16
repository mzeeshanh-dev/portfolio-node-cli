import chalk from 'chalk';

// ─── Theme Definitions ─────────────────────────────────
// Dark theme extracted from portfolio's globals.css and tailwind.config.ts
// Primary: #3b82f6 (blue-500), Secondary: #94a3b8 (slate-400)

const darkTheme = {
    primary: '#3b82f6',
    secondary: '#94a3b8',
    accent: '#06b6d4',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    muted: '#64748b',
    border: '#1e293b',
    text: '#f8fafc',
    dim: '#475569',
};

// ─── Active Theme ───────────────────────────────────────

export function getTheme() {
    return darkTheme;
}

export function getThemeByName(name: string) {
    return darkTheme;
}

// ─── Chalk Helpers ──────────────────────────────────────

export function primary(text: string): string {
    return chalk.hex(getTheme().primary)(text);
}

export function secondary(text: string): string {
    return chalk.hex(getTheme().secondary)(text);
}

export function accent(text: string): string {
    return chalk.hex(getTheme().accent)(text);
}

export function success(text: string): string {
    return chalk.hex(getTheme().success)(text);
}

export function warning(text: string): string {
    return chalk.hex(getTheme().warning)(text);
}

export function error(text: string): string {
    return chalk.hex(getTheme().error)(text);
}

export function muted(text: string): string {
    return chalk.hex(getTheme().muted)(text);
}

export function dim(text: string): string {
    return chalk.hex(getTheme().dim)(text);
}

export function bold(text: string): string {
    return chalk.bold(text);
}

export function divider(width: number = 50): string {
    return chalk.hex(getTheme().border)('─'.repeat(width));
}

export function label(key: string, value: string): string {
    return `  ${muted(key.padEnd(16))}${chalk.white(value)}`;
}
