import chalk from 'chalk';
import { dim, success } from './colors.js';

// ─── Typewriter Effect ──────────────────────────────────

export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function typewriter(text: string, speed: number = 30): Promise<void> {
    for (const char of text) {
        process.stdout.write(char);
        await sleep(speed);
    }
    console.log();
}

// ─── Boot Sequence ──────────────────────────────────────

export async function showBootSequence(): Promise<void> {
    const steps = [
        'Loading profile...',
        'Syncing data...',
        'Ready.',
    ];

    for (const step of steps) {
        process.stdout.write(`  ${dim('○')}  ${dim(step)}`);
        await sleep(200);
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        console.log(`  ${success('√')}  ${dim(step)}`);
    }
    console.log();
}
