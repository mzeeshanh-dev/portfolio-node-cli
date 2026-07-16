import chalk from 'chalk';
import boxen from 'boxen';
import { getThemeByName } from './colors.js';

export function showBanner(): void {
    const colors = getThemeByName('dark');

    const title = chalk.bold.white('⚡  ZEESHAN.DEV CLI');
    const version = chalk.hex(colors.secondary)('v1.0.0');
    
    const subtitle = chalk.hex(colors.accent)(
        'Full Stack  •  Agritech  •  GIS  •  Remote Sensing'
    );

    const content = `\n  ${title}  ${version}\n\n  ${subtitle}\n`;

    console.log(
        boxen(content, {
            padding: 0,
            margin: { top: 1, bottom: 1 },
            borderColor: colors.primary,
            borderStyle: 'bold',
            align: 'left',
        })
    );
}

export function showWelcomeStatus(isOffline: boolean): void {
    if (isOffline) {
        console.log(`  ${chalk.yellow('⚠')}  ${chalk.yellow('Running in offline mode (using cached data)')}`);
    } else {
        console.log(`  ${chalk.green('✔')}  ${chalk.green('Connected to portfolio API')}`);
    }
    console.log();
}

export function showMOTD(): void {
    const quotes = [
        "Good software isn't built by writing more code. It's built by deleting unnecessary code.",
        "Simplicity is prerequisite for reliability.",
        "First, solve the problem. Then, write the code.",
        "Code is read much more often than it is written.",
        "Make it work, make it right, make it fast.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Before software can be reusable it first has to be usable.",
    ];

    const today = new Date();
    // Use the day of the year to pick a deterministic daily quote
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const quote = quotes[dayOfYear % quotes.length];

    console.log(`  ${chalk.hex('#f59e0b')('💡')}  ${chalk.italic.hex('#94a3b8')(`"${quote}"`)}`);
    console.log();
}

export function showStatsBar(repos: number, followers: number, contributions: number, projects: number): void {
    const dims = chalk.hex('#475569');
    const highlight = chalk.white.bold;
    
    console.log(
        `  ${dims('Projects:')} ${highlight(projects)}  ${dims('│')}  ` +
        `${dims('Repos:')} ${highlight(repos)}  ${dims('│')}  ` +
        `${dims('Followers:')} ${highlight(followers)}  ${dims('│')}  ` +
        `${dims('Contributions:')} ${highlight(contributions)}`
    );
    console.log();
}
