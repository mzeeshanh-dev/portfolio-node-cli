import chalk from 'chalk';
import { getExperience } from '../services/portfolio.service.js';
import { primary, muted, dim, divider } from '../ui/colors.js';
import { withSpinner } from '../ui/spinner.js';

export async function timelineCommand(forceLatest: boolean = false): Promise<void> {
    const experienceList = await withSpinner('Loading timeline...', () => getExperience(forceLatest));

    if (!experienceList.length) {
        console.log(`\n  ${chalk.yellow('⚠')}  No data found.\n`);
        return;
    }

    const sorted = [...experienceList].sort((a, b) => a.order - b.order);

    console.log();
    console.log(`  ${primary('📅  Career Timeline')}`);
    console.log(divider(50));
    console.log();

    sorted.forEach((exp, index) => {
        const date = exp.startDate;
        const padDate = date.padEnd(16);
        const title = chalk.white(exp.role);
        const company = muted(exp.company);
        
        console.log(`  ${dim(padDate)} ${chalk.hex('#06b6d4')('●')}  ${title} ${dim('at')} ${company}`);
        
        if (index < sorted.length - 1) {
            console.log(`  ${' '.repeat(16)} ${dim('│')}`);
            console.log(`  ${' '.repeat(16)} ${dim('↓')}`);
            console.log(`  ${' '.repeat(16)} ${dim('│')}`);
        }
    });

    console.log();
    console.log(`  ${primary('NOW'.padEnd(16))} ${chalk.green('◉')}  ${chalk.white('Building Agritech Software & @zeeshan-dev/cli')}`);
    console.log();
}
