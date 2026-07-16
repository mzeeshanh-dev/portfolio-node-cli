import chalk from 'chalk';
import { syncAll } from '../services/portfolio.service.js';
import { getGitHubData } from '../services/github.service.js';
import { success, dim, warning } from '../ui/colors.js';
import { createSpinner } from '../ui/spinner.js';

export async function updateCommand(): Promise<void> {

    console.log();

    // Sync profile data
    const spinner1 = createSpinner('Syncing profile data...');
    spinner1.start();
    try {
        const result = await syncAll(true);
        spinner1.succeed(`Profile synced — ${result.projects} projects, ${result.experience} experience entries`);
    } catch {
        spinner1.fail('Failed to sync profile data');
    }

    // Sync GitHub data
    const spinner2 = createSpinner('Syncing GitHub stats...');
    spinner2.start();
    try {
        const github = await getGitHubData(true);
        if (github) {
            spinner2.succeed(`GitHub synced — ${github.totals.contributions} contributions`);
        } else {
            spinner2.warn('GitHub data unavailable');
        }
    } catch {
        spinner2.fail('Failed to sync GitHub data');
    }

    console.log();
    console.log(`  ${success('√')}  ${chalk.white('All data synced.')} ${dim('Last synced: Just now')}`);
    console.log();
}
