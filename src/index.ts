import { Command } from 'commander';
import chalk from 'chalk';
import { showBanner, showWelcomeStatus, showMOTD, showStatsBar } from './ui/banner.js';
import { showBootSequence } from './ui/animations.js';
import { showMainMenu, promptContinue } from './ui/menu.js';
import type { MenuChoice } from './ui/menu.js';
import { dim, success, muted, accent, primary } from './ui/colors.js';
import { getGitHubData } from './services/github.service.js';
import { getProjects, syncAll } from './services/portfolio.service.js';
import updateNotifier from 'update-notifier';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkg = JSON.parse(readFileSync(path.join(__dirname, '../package.json'), 'utf8'));

// ─── Commands ───────────────────────────────────────────

import { aboutCommand } from './commands/about.js';
import { projectsCommand } from './commands/projects.js';
import { experienceCommand } from './commands/experience.js';
import { skillsCommand } from './commands/skills.js';
import { githubCommand } from './commands/github.js';
import { resumeCommand } from './commands/resume.js';
import { contactCommand } from './commands/contact.js';
import { hireCommand } from './commands/hire.js';
import { timelineCommand } from './commands/timeline.js';
import { settingsCommand } from './commands/settings.js';
import { updateCommand } from './commands/update.js';
import { doctorCommand } from './commands/doctor.js';

// ─── Route Commands ─────────────────────────────────────

import readline from 'readline';

function strictClear() {
    process.stdout.write('\x1Bc'); // standard terminal reset
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
}

async function runCommand(choice: MenuChoice, forceLatest: boolean): Promise<void> {
    if (choice !== 'exit') {
        strictClear();
        showBanner();
    }
    
    switch (choice) {
        case 'about': await aboutCommand(); break;
        case 'projects': await projectsCommand(forceLatest); break;
        case 'experience': await experienceCommand(forceLatest); break;
        case 'skills': await skillsCommand(); break;
        case 'github': await githubCommand(forceLatest); break;
        case 'resume': await resumeCommand(); break;
        case 'contact': await contactCommand(); break;
        case 'hire': await hireCommand(); break;
        case 'timeline': await timelineCommand(forceLatest); break;
        case 'settings': await settingsCommand(); break;
        case 'update': await updateCommand(); break;
        case 'doctor': await doctorCommand(); break;
        case 'exit':
            console.log(`\n  ${dim('👋')}  ${muted('See you later, developer.')}\n`);
            process.exit(0);
    }
}

// ─── Interactive Loop ───────────────────────────────────

import { animateBanner } from './ui/animations.js';

async function interactiveMode(forceLatest: boolean): Promise<void> {
    // Check for CLI updates globally
    const notifier = updateNotifier({ pkg });
    notifier.notify({ isGlobal: true });

    // Boot sequence
    await animateBanner();
    await showBootSequence();

    // Welcome status
    let isOffline = false;
    try {
        const github = await getGitHubData(false);
        if (!github) isOffline = true;
    } catch {
        isOffline = true;
    }
    showWelcomeStatus(isOffline);

    // MOTD
    showMOTD();

    // Quick stats bar
    try {
        const [github, projects] = await Promise.all([
            getGitHubData(false),
            getProjects(false),
        ]);
        if (github) {
            showStatsBar(
                github.totals.repositories,
                github.profile.followers,
                github.totals.contributions,
                projects.length,
            );
        }
    } catch {
    }

    // If --latest, force sync first. Otherwise, silent background sync!
    if (forceLatest) {
        await updateCommand();
    } else {
        syncAll(true).catch(() => {});
    }

    // Menu loop
    let running = true;
    while (running) {
        const choice = await showMainMenu();
        if (!choice) {
            running = false;
            console.log(`\n  ${dim('👋')}  ${muted('See you later, developer.')}\n`);
            break;
        }

        await runCommand(choice, forceLatest);

        if (choice !== 'exit') {
            const continueMenu = await promptContinue();
            if (!continueMenu) {
                running = false;
                console.log(`\n  ${dim('👋')}  ${muted('See you later, developer.')}\n`);
            } else {
                strictClear();
                showBanner();
            }
        }
    }
}

// ─── Easter Eggs ────────────────────────────────────────

function handleEasterEgg(input: string): boolean {
    const eggs: Record<string, () => void> = {
        'coffee': () => {
            console.log(`\n  ☕  ${chalk.white('Compiling motivation...')}\n`);
        },
        'joke': () => {
            const jokes = [
                'Works on my machine. 🤷',
                'It\'s not a bug, it\'s a feature.',
                '99 little bugs in the code, 99 little bugs. Take one down, patch it around... 127 little bugs in the code.',
                'A SQL query walks into a bar, walks up to two tables and asks: "Can I join you?"',
                'Why do programmers prefer dark mode? Because light attracts bugs.',
                'There are only 10 types of people in the world: those who understand binary and those who don\'t.',
            ];
            const joke = jokes[Math.floor(Math.random() * jokes.length)];
            console.log(`\n  😂  ${chalk.white(joke)}\n`);
        },
        '42': () => {
            console.log(`\n  🌌  ${chalk.white('The answer to everything. You\'re clearly a person of culture.')}\n`);
        },
    };

    if (eggs[input]) {
        eggs[input]();
        return true;
    }
    return false;
}

// ─── CLI Setup ──────────────────────────────────────────

const program = new Command();

program
    .name('zeeshan')
    .description('Explore M. Zeeshan Haider\'s developer portfolio from your terminal')
    .version('1.0.0', '-v, --version')
    .option('--latest', 'Force-sync latest data from portfolio API')
    .action(async (options) => {
        await interactiveMode(!!options.latest);
    });

// ─── Direct Subcommands ─────────────────────────────────

program.command('about').description('About Zeeshan').action(async () => {
    strictClear();
    showBanner();
    await aboutCommand();
});

program.command('projects').description('View projects').action(async () => {
    strictClear();
    showBanner();
    await projectsCommand(program.opts().latest);
});

program.command('experience').description('Work experience & education').action(async () => {
    strictClear();
    showBanner();
    await experienceCommand(program.opts().latest);
});

program.command('skills').description('Skills & technologies').action(async () => {
    strictClear();
    showBanner();
    await skillsCommand();
});

program.command('github').description('Live GitHub stats').action(async () => {
    strictClear();
    showBanner();
    await githubCommand(program.opts().latest);
});

program.command('resume').description('Open resume in browser').action(async () => {
    strictClear();
    await resumeCommand();
});

program.command('contact').description('Contact information').action(async () => {
    strictClear();
    showBanner();
    await contactCommand();
});

program.command('hire').description("Let's build something awesome").action(async () => {
    strictClear();
    showBanner();
    await hireCommand();
});

program.command('timeline').description('Career journey timeline').action(async () => {
    strictClear();
    showBanner();
    await timelineCommand(program.opts().latest);
});

program.command('settings').description('View & manage settings').action(async () => {
    strictClear();
    await settingsCommand();
});

program.command('update').aliases(['sync']).description('Force-sync latest data').action(async () => {
    strictClear();
    showBanner();
    await updateCommand();
});

program.command('doctor').description('Diagnostics & API Status').action(async () => {
    strictClear();
    showBanner();
    await doctorCommand();
});

// ─── Easter Egg Commands ────────────────────────────────

program.command('coffee', { hidden: true }).action(() => { handleEasterEgg('coffee'); });
program.command('joke', { hidden: true }).action(() => { handleEasterEgg('joke'); });
program.command('42', { hidden: true }).action(() => { handleEasterEgg('42'); });

program.command('sudo', { hidden: true })
    .argument('[args...]')
    .action((args: string[]) => {
        const cmd = args.join(' ').toLowerCase();
        if (cmd.includes('hire') && cmd.includes('zeeshan')) {
            console.log(`\n  🔓  ${chalk.green('Access Granted.')} ${chalk.white('Opening contact details...')}\n`);
            hireCommand();
        } else {
            console.log(`\n  ${chalk.red('Permission denied.')} ${dim('Try: sudo hire zeeshan')}\n`);
        }
    });

// ─── Parse & Run ────────────────────────────────────────

program.parse();
