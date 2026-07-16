import { Command } from 'commander';
import chalk from 'chalk';
import { showBanner, showWelcomeStatus, showMOTD, showStatsBar } from './ui/banner.js';
import { showBootSequence } from './ui/animations.js';
import { showMainMenu, promptContinue } from './ui/menu.js';
import type { MenuChoice } from './ui/menu.js';
import { dim, success, muted, accent, primary } from './ui/colors.js';
import { getGitHubData } from './services/github.service.js';
import { getProjects } from './services/portfolio.service.js';

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

// ─── Route Commands ─────────────────────────────────────

async function runCommand(choice: MenuChoice, forceLatest: boolean): Promise<void> {
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
        case 'exit':
            console.log(`\n  ${dim('👋')}  ${muted('See you later, developer.')}\n`);
            process.exit(0);
    }
}

// ─── Interactive Loop ───────────────────────────────────

async function interactiveMode(forceLatest: boolean): Promise<void> {
    // Boot sequence
    showBanner();
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

    // If --latest, force sync first
    if (forceLatest) {
        await updateCommand();
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
                console.clear();
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
    showBanner();
    await aboutCommand();
});

program.command('projects').description('View projects').action(async () => {
    showBanner();
    await projectsCommand(program.opts().latest);
});

program.command('experience').description('Work experience & education').action(async () => {
    showBanner();
    await experienceCommand(program.opts().latest);
});

program.command('skills').description('Skills & technologies').action(async () => {
    showBanner();
    await skillsCommand();
});

program.command('github').description('Live GitHub stats').action(async () => {
    showBanner();
    await githubCommand(program.opts().latest);
});

program.command('resume').description('Open resume in browser').action(async () => {
    await resumeCommand();
});

program.command('contact').description('Contact information').action(async () => {
    showBanner();
    await contactCommand();
});

program.command('hire').description("Let's build something awesome").action(async () => {
    showBanner();
    await hireCommand();
});

program.command('timeline').description('Career journey timeline').action(async () => {
    showBanner();
    await timelineCommand(program.opts().latest);
});

program.command('settings').description('View & manage settings').action(async () => {
    await settingsCommand();
});

program.command('update').aliases(['sync']).description('Force-sync latest data').action(async () => {
    showBanner();
    await updateCommand();
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
