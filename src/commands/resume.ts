import chalk from 'chalk';
import { getProfile } from '../services/portfolio.service.js';
import { primary, muted, dim, divider, success } from '../ui/colors.js';
import open from 'open';

export async function resumeCommand(): Promise<void> {
    const profile = getProfile();

    console.log();
    console.log(`  ${primary('📄  Resume')}`);
    console.log(divider(50));
    console.log();

    if (profile.resumeUrl) {
        console.log(`  ${success('✔')}  ${chalk.white('Opening resume in your default browser...')}`);
        console.log(`     ${dim(profile.resumeUrl)}`);
        console.log();
        await open(profile.resumeUrl);
    } else {
        console.log(`  ${chalk.yellow('⚠')}  ${muted('Resume URL is currently unavailable.')}`);
        console.log();
    }
}
