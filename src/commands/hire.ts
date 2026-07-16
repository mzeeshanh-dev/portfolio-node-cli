import chalk from 'chalk';

import { getProfile } from '../services/portfolio.service.js';
import { primary, muted, dim, divider, success } from '../ui/colors.js';
import * as p from '@clack/prompts';
import open from 'open';
import clipboardy from 'clipboardy';

export async function hireCommand(): Promise<void> {
    const profile = getProfile();

    console.log();
    console.log(chalk.hex('#1e293b')('╭─────────────────────────────────────────────────────────╮'));
    console.log(chalk.hex('#1e293b')('│') + '                                                         ' + chalk.hex('#1e293b')('│'));
    console.log(chalk.hex('#1e293b')('│') + `   ${chalk.bold.white('Let\'s build something awesome.')}                      ` + chalk.hex('#1e293b')('│'));
    console.log(chalk.hex('#1e293b')('│') + '                                                         ' + chalk.hex('#1e293b')('│'));
    console.log(chalk.hex('#1e293b')('│') + `   ${'📧 Email'.padEnd(16)} ${chalk.white(profile.email).padEnd(36)}` + chalk.hex('#1e293b')('│'));
    console.log(chalk.hex('#1e293b')('│') + `   ${'💼 LinkedIn'.padEnd(16)} ${chalk.blue(profile.linkedin).padEnd(36 + (chalk.blue(profile.linkedin).length - profile.linkedin.length))}` + chalk.hex('#1e293b')('│'));
    console.log(chalk.hex('#1e293b')('│') + `   ${'🌐 Portfolio'.padEnd(16)} ${chalk.blue(profile.portfolio).padEnd(36 + (chalk.blue(profile.portfolio).length - profile.portfolio.length))}` + chalk.hex('#1e293b')('│'));
    console.log(chalk.hex('#1e293b')('│') + `   ${'📍 Location'.padEnd(16)} ${chalk.white(profile.location).padEnd(36)}` + chalk.hex('#1e293b')('│'));
    console.log(chalk.hex('#1e293b')('│') + `   ${'🟢 Available'.padEnd(16)} ${chalk.white(profile.availability).padEnd(36)}` + chalk.hex('#1e293b')('│'));
    console.log(chalk.hex('#1e293b')('│') + `   ${'⏱  Response'.padEnd(16)} ${chalk.white(profile.responseTime).padEnd(36)}` + chalk.hex('#1e293b')('│'));
    console.log(chalk.hex('#1e293b')('│') + '                                                         ' + chalk.hex('#1e293b')('│'));
    console.log(chalk.hex('#1e293b')('╰─────────────────────────────────────────────────────────╯'));
    console.log();

    const choice = await p.select({
        message: 'Get in touch:',
        options: [
            { value: 'email', label: 'Send Email', hint: 'Opens default mail client' },
            { value: 'copy', label: 'Copy Email', hint: 'Copy to clipboard' },
            { value: 'linkedin', label: 'Open LinkedIn', hint: 'Opens in browser' },
            { value: 'portfolio', label: 'Open Portfolio', hint: 'Opens in browser' },
            { value: 'back', label: '← Back' },
        ]
    });

    if (p.isCancel(choice) || choice === 'back') {
        return;
    }

    if (choice === 'email') {
        await open(`mailto:${profile.email}`);
        console.log(`\n  ${success('✔')}  ${chalk.white('Opened email client.')}\n`);
    } else if (choice === 'copy') {
        try {
            clipboardy.writeSync(profile.email);
            console.log(`\n  ${success('✔')}  ${chalk.white('Copied email to clipboard!')}\n`);
        } catch {
            console.log(`\n  ${chalk.yellow('⚠')}  ${chalk.white('Failed to copy. Email is: ' + profile.email)}\n`);
        }
    } else if (choice === 'linkedin') {
        await open(profile.linkedin);
        console.log(`\n  ${success('✔')}  ${chalk.white('Opened LinkedIn in browser.')}\n`);
    } else if (choice === 'portfolio') {
        await open(profile.portfolio);
        console.log(`\n  ${success('✔')}  ${chalk.white('Opened Portfolio in browser.')}\n`);
    }
}
