import chalk from 'chalk';
import { getGitHubData } from '../services/github.service.js';
import { primary, muted, dim, divider, label, success } from '../ui/colors.js';
import { withSpinner } from '../ui/spinner.js';

export async function githubCommand(forceLatest: boolean = false): Promise<void> {
    const github = await withSpinner('Fetching live GitHub stats...', () => getGitHubData(forceLatest));

    if (!github) {
        console.log(`\n  ${chalk.yellow('⚠')}  Unable to fetch GitHub stats right now.\n`);
        return;
    }

    console.log();
    console.log(`  ${primary('Octocat Stats')} ${dim(`(@${github.profile.username})`)}`);
    console.log(divider(50));
    console.log();

    console.log(label('Followers', github.profile.followers.toString()));
    console.log(label('Public Repos', github.totals.repositories.toString()));
    console.log(label('Total Commits', github.totals.commits.toString()));
    console.log(label('Contributions', github.totals.contributions.toString()));
    console.log(label('Issues & PRs', (github.totals.issues + github.totals.prs).toString()));
    console.log();

    console.log(`  ${primary('Top Languages')}`);
    console.log(divider(50));
    console.log();
    
    github.languages.slice(0, 5).forEach(lang => {
        const bar = '█'.repeat(Math.max(1, Math.round(lang.percent / 5)));
        console.log(`  ${muted(lang.name.padEnd(12))} ${chalk.hex(lang.color)(bar)} ${dim(`${lang.percent}%`)}`);
    });
    console.log();
}
