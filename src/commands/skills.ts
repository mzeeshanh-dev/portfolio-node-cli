import chalk from 'chalk';
import { getSkills } from '../services/portfolio.service.js';
import { primary, muted, dim, divider } from '../ui/colors.js';
import boxen from 'boxen';

export async function skillsCommand(): Promise<void> {
    const skillsList = getSkills();

    console.log();
    console.log(`  ${primary('🛠️  Skills & Technologies')}`);
    console.log(divider(50));
    console.log();

    skillsList.forEach(category => {
        const content = `${chalk.bold.white(category.title)}

${muted(category.description)}

${chalk.cyan(category.skills.join('  •  '))}`;

        console.log(boxen(content, {
            padding: { top: 0, bottom: 0, left: 1, right: 1 },
            borderColor: '#1e293b',
            borderStyle: 'round',
            width: 78,
            margin: { left: 1 }
        }));
        console.log();
    });
}
