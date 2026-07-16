import chalk from 'chalk';

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
    
    const linkedIn = chalk.blue(profile.linkedin);
    const github = chalk.blue(profile.github);
    const portfolio = chalk.blue(profile.portfolio);

    console.log(label('LinkedIn', linkedIn));
    console.log(label('GitHub', github));
    console.log(label('Portfolio', portfolio));
    console.log(label('Timezone', profile.timezone));
    console.log();
    
    console.log(`  🟢  ${dim('Current Availability:')} ${chalk.white(profile.availability)}`);
    console.log(`  ⏱   ${dim('Response Time:')} ${chalk.white(profile.responseTime)}`);
    console.log();
}
