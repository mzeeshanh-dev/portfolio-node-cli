import chalk from 'chalk';
import terminalLink from 'terminal-link';
import { getProfile } from '../services/portfolio.service.js';
import { primary, muted, dim, divider, label, success } from '../ui/colors.js';

export async function contactCommand(): Promise<void> {
    const profile = getProfile();

    console.log();
    console.log(`  ${primary('📬  Contact & Links')}`);
    console.log(divider(50));
    console.log();

    console.log(label('Email', profile.email));
    console.log(label('Phone', profile.phone));
    
    const linkedIn = terminalLink(chalk.blue(profile.linkedin), profile.linkedin, { fallback: false });
    const github = terminalLink(chalk.blue(profile.github), profile.github, { fallback: false });
    const portfolio = terminalLink(chalk.blue(profile.portfolio), profile.portfolio, { fallback: false });

    console.log(label('LinkedIn', linkedIn));
    console.log(label('GitHub', github));
    console.log(label('Portfolio', portfolio));
    console.log(label('Timezone', profile.timezone));
    console.log();
    
    console.log(`  🟢  ${dim('Current Availability:')} ${chalk.white(profile.availability)}`);
    console.log(`  ⏱   ${dim('Response Time:')} ${chalk.white(profile.responseTime)}`);
    console.log();
}
