import chalk from 'chalk';
import { getExperience, getProfile } from '../services/portfolio.service.js';
import { primary, muted, dim, divider } from '../ui/colors.js';
import { withSpinner } from '../ui/spinner.js';

export async function experienceCommand(forceLatest: boolean = false): Promise<void> {
    const experienceList = await withSpinner('Loading experience...', () => getExperience(forceLatest));

    if (!experienceList.length) {
        console.log(`\n  ${chalk.yellow('⚠')}  No experience data found.\n`);
        return;
    }

    const work = experienceList.filter(e => !e.isEducation).sort((a, b) => a.order - b.order);
    const edu = experienceList.filter(e => e.isEducation).sort((a, b) => a.order - b.order);

    console.log();
    console.log(divider(50));
    console.log(`  ${primary('WORK EXPERIENCE')}`);
    console.log(divider(50));
    console.log();

    work.forEach(exp => {
        console.log(`  ${chalk.white('●')}  ${chalk.bold(exp.role)} — ${chalk.white(exp.company)}`);
        console.log(`     ${chalk.hex('#06b6d4')(exp.startDate + ' – ' + exp.endDate)}  ${dim('│')}  ${dim(exp.location)}`);
        
        const lines = exp.description.split('\n');
        lines.forEach(line => {
            if (line.trim()) console.log(`     ${dim('•')}  ${muted(line.trim())}`);
        });
        console.log();
    });

    if (edu.length > 0) {
        console.log(divider(50));
        console.log(`  ${primary('EDUCATION')}`);
        console.log(divider(50));
        console.log();

        edu.forEach(exp => {
            console.log(`  ${chalk.white('●')}  ${chalk.bold(exp.role)}`);
            console.log(`     ${chalk.white(exp.company)}`);
            console.log(`     ${chalk.hex('#06b6d4')(exp.startDate + ' – ' + exp.endDate)}`);
            if (exp.description) console.log(`     ${muted(exp.description)}`);
            console.log();
        });
    }
}
