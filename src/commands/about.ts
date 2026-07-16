import chalk from 'chalk';
import { getProfile } from '../services/portfolio.service.js';
import { primary, muted, dim, divider, label, success } from '../ui/colors.js';

export async function aboutCommand(): Promise<void> {
    const profile = getProfile();

    console.log(`\n  👋  Hi, I'm ${chalk.white(profile.name)}\n`);
    
    console.log(chalk.hex('#1e293b')('╭───────────────────────────────────────────────────╮'));
    console.log(chalk.hex('#1e293b')('│') + '                                                   ' + chalk.hex('#1e293b')('│'));
    console.log(chalk.hex('#1e293b')('│') + label('Role', profile.title) + '    ' + chalk.hex('#1e293b')('│'));
    console.log(chalk.hex('#1e293b')('│') + label('Company', profile.company) + '             ' + chalk.hex('#1e293b')('│'));
    console.log(chalk.hex('#1e293b')('│') + label('Location', profile.location) + '            ' + chalk.hex('#1e293b')('│'));
    console.log(chalk.hex('#1e293b')('│') + label('Focus', 'Agritech • GIS • Remote Sensing') + ' ' + chalk.hex('#1e293b')('│'));
    console.log(chalk.hex('#1e293b')('│') + label('Status', `🟢 ${profile.status}`) + '     ' + chalk.hex('#1e293b')('│'));
    console.log(chalk.hex('#1e293b')('│') + '                                                   ' + chalk.hex('#1e293b')('│'));
    console.log(chalk.hex('#1e293b')('╰───────────────────────────────────────────────────╯'));
    console.log();

    console.log(`  ${primary('Engineering Philosophy')}`);
    console.log(divider(45));
    console.log();
    
    console.log(`  • ${chalk.white('Business-first engineering')}`);
    console.log(`    ${muted('Every project starts with understanding the problem before writing code.')}`);
    console.log();
    
    console.log(`  • ${chalk.white('End-to-end development')}`);
    console.log(`    ${muted('From planning and architecture to backend, frontend, deployment, and improvements.')}`);
    console.log();
    
    console.log(`  • ${chalk.white('Cross-industry experience')}`);
    console.log(`    ${muted('Software across Agritech, GIS, SaaS, e-commerce, and business platforms.')}`);
    console.log();

    console.log(`  ${dim('[Full Stack Engineering]')}  ${dim('[SaaS & Web Apps]')}  ${dim('[E-commerce]')}  ${dim('[Dashboards]')}  ${dim('[Agritech & GIS]')}  ${dim('[AI Integrations]')}`);
    console.log();
}
