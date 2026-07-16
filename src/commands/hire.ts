import chalk from 'chalk';
import terminalLink from 'terminal-link';
import { getProfile } from '../services/portfolio.service.js';
import { primary, muted, dim, divider, success } from '../ui/colors.js';

export async function hireCommand(): Promise<void> {
    const profile = getProfile();

    console.log();
    console.log(chalk.hex('#1e293b')('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓'));
    console.log(chalk.hex('#1e293b')('┃                                                      ┃'));
    console.log(chalk.hex('#1e293b')('┃') + `   ${chalk.bold.white('Let\'s build something awesome.')}                     ` + chalk.hex('#1e293b')('┃'));
    console.log(chalk.hex('#1e293b')('┃                                                      ┃'));
    console.log(chalk.hex('#1e293b')('┃') + `   ${muted('I build production-ready full-stack software that')}  ` + chalk.hex('#1e293b')('┃'));
    console.log(chalk.hex('#1e293b')('┃') + `   ${muted('solves real business problems — not just websites.')} ` + chalk.hex('#1e293b')('┃'));
    console.log(chalk.hex('#1e293b')('┃                                                      ┃'));
    console.log(chalk.hex('#1e293b')('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛'));
    console.log();

    console.log(`  ${primary('Why work with me?')}`);
    console.log();
    console.log(`  ${success('✔')}  ${chalk.white('End-to-end')} — I handle frontend, backend, and deployment.`);
    console.log(`  ${success('✔')}  ${chalk.white('Production mindset')} — Auth, error handling, performance from day 1.`);
    console.log(`  ${success('✔')}  ${chalk.white('Domain depth')} — Agritech, GIS, SaaS — not just CRUD apps.`);
    console.log(`  ${success('✔')}  ${chalk.white('Ship & iterate')} — I deliver working software, then improve it.`);
    
    console.log();
    console.log(divider(50));
    console.log();

    console.log(`  ${muted('Email'.padEnd(15))} ${chalk.white(profile.email)}`);
    console.log(`  ${muted('Phone'.padEnd(15))} ${chalk.white(profile.phone)}`);
    console.log(`  ${muted('LinkedIn'.padEnd(15))} ${chalk.blue(terminalLink(profile.linkedin, profile.linkedin, { fallback: false }))}`);
    console.log(`  ${muted('Portfolio'.padEnd(15))} ${chalk.blue(terminalLink(profile.portfolio, profile.portfolio, { fallback: false }))}`);
    console.log(`  ${muted('Timezone'.padEnd(15))} ${chalk.white(profile.timezone)}`);
    console.log();

    console.log(`  🟢  ${dim('Current Availability:')} ${chalk.white(profile.availability)}`);
    console.log(`  ⏱   ${dim('Response Time:')} ${chalk.white(profile.responseTime)}`);
    console.log();
}
