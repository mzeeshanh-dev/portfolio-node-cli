import chalk from 'chalk';
import { dim, success, getThemeByName } from './colors.js';

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

import readline from 'readline';

// ─── Animated Banner ────────────────────────────────────

export async function animateBanner(): Promise<void> {
    const colors = getThemeByName('dark');
    const art = [
        "███████╗███████╗███████╗███████╗██╗  ██╗ █████╗ ███╗   ██╗      ██████╗ ███████╗██╗   ██╗",
        "╚══███╔╝██╔════╝██╔════╝██╔════╝██║  ██║██╔══██╗████╗  ██║      ██╔══██╗██╔════╝██║   ██║",
        "  ███╔╝ █████╗  █████╗  ███████╗███████║███████║██╔██╗ ██║█████╗██║  ██║█████╗  ██║   ██║",
        " ███╔╝  ██╔══╝  ██╔══╝  ╚════██║██╔══██║██╔══██║██║╚██╗██║╚════╝██║  ██║██╔══╝  ╚██╗ ██╔╝",
        "███████╗███████╗███████╗███████║██║  ██║██║  ██║██║ ╚████║      ██████╔╝███████╗ ╚████╔╝ ",
        "╚══════╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝      ╚═════╝ ╚══════╝  ╚═══╝  "
    ];
    
    console.clear();
    process.stdout.write('\x1b[?25l'); // hide cursor
    
    const width = art[0].length;
    for (let col = 0; col < width; col += 2) {
        for (let row = 0; row < art.length; row++) {
            readline.cursorTo(process.stdout, col + 2, row + 1); // 2 spaces padding left, 1 line top
            process.stdout.write(chalk.hex(colors.primary)(art[row].substring(col, col + 2)));
        }
        await sleep(10);
    }
    
    // Move cursor down to the end of the art
    readline.cursorTo(process.stdout, 0, art.length + 2);
    process.stdout.write('\x1b[?25h'); // show cursor

    // Typewriter the subtitle
    const subtitles = [
        'Full Stack Software Engineer',
        'Agritech Software Engineer',
        'GIS & Remote Sensing'
    ];
    
    for (const line of subtitles) {
        process.stdout.write('  ');
        for (const char of line) {
            process.stdout.write(chalk.hex(colors.accent)(char));
            await sleep(10);
        }
        console.log();
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
