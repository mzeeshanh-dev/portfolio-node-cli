import chalk from 'chalk';
import * as p from '@clack/prompts';
import open from 'open';
import terminalLink from 'terminal-link';
import { getProjects } from '../services/portfolio.service.js';
import { primary, muted, dim, divider, accent } from '../ui/colors.js';
import { withSpinner } from '../ui/spinner.js';

export async function projectsCommand(forceLatest: boolean = false): Promise<void> {
    const projects = await withSpinner('Loading projects...', () => getProjects(forceLatest));

    if (!projects.length) {
        console.log(`\n  ${chalk.yellow('⚠')}  No projects found.\n`);
        return;
    }

    console.log();
    console.log(`  ${primary('📦 Projects')} ${dim(`(${projects.length})`)}`);
    console.log(divider(50));
    console.log();

    const projectChoice = await p.select({
        message: 'Select a project to explore:',
        options: projects.map(proj => ({
            value: proj._id,
            label: chalk.white(proj.title),
            hint: proj.subtitle,
        })),
    });

    if (p.isCancel(projectChoice)) return;

    const selected = projects.find(proj => proj._id === projectChoice);
    if (!selected) return;

    // Show project details
    console.log();
    console.log(`  ${chalk.bold.hex(selected.color || '#3b82f6')(selected.title)}`);
    console.log(`  ${muted(selected.subtitle)}`);
    console.log();

    // Image Link
    if (selected.image) {
        const link = terminalLink('View Project Image (Click me)', selected.image, { fallback: false });
        console.log(`  ${chalk.blue.underline(link)}`);
        console.log();
    }

    // Description
    console.log(`  ${chalk.white(selected.description)}`);
    console.log();

    // Tags
    if (selected.tags && selected.tags.length) {
        console.log(`  ${dim(selected.tags.join(' • '))}`);
        console.log();
    }

    // Action menu
    const actions = [];
    if (selected.liveDemo) actions.push({ value: 'live', label: `🚀 ${chalk.white('Open Live Demo')} ${dim('(Opens in browser)')}` });
    if (selected.githubRepo) actions.push({ value: 'github', label: `📂 ${chalk.white('Open GitHub Repo')}` });
    actions.push({ value: 'back', label: `←  Back` });

    const action = await p.select({
        message: 'What would you like to do?',
        options: actions,
    });

    if (p.isCancel(action) || action === 'back') return;

    if (action === 'live' && selected.liveDemo) {
        console.log(`\n  ${chalk.green('✔')} Opening ${selected.liveDemo}...\n`);
        await open(selected.liveDemo);
    } else if (action === 'github' && selected.githubRepo) {
        console.log(`\n  ${chalk.green('✔')} Opening ${selected.githubRepo}...\n`);
        await open(selected.githubRepo);
    }
}
