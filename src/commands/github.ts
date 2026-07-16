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
    console.log(`  ${primary('Octocat Stats')} ${dim(`(@${github.profile.login})`)}`);
    console.log(divider(50));
    console.log();

    console.log(label('Followers', github.profile.followers.toString()));
    console.log(label('Public Repos', github.totals.repositories.toString()));
    console.log(label('Contributions', github.totals.contributions.toString()));
    console.log(label('Stars', github.totals.stars.toString()));
    console.log(label('Forks', github.totals.forks.toString()));
    console.log();

    console.log(`  ${primary('Top Languages')}`);
    console.log(divider(50));
    console.log();
    
    const totalCount = github.languages.reduce((acc, lang) => acc + lang.count, 0);
    github.languages.slice(0, 5).forEach(lang => {
        const percent = totalCount > 0 ? Math.round((lang.count / totalCount) * 100) : 0;
        const bar = '█'.repeat(Math.max(1, Math.round(percent / 5)));
        console.log(`  ${muted(lang.name.padEnd(12))} ${chalk.cyan(bar)} ${dim(`${percent}%`)}`);
    });
    console.log();
}
