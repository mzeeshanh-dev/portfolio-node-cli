import chalk from 'chalk';
import { getSkills } from '../services/portfolio.service.js';
import { primary, muted, dim, divider } from '../ui/colors.js';

export async function skillsCommand(): Promise<void> {
    const skillsList = getSkills();

    console.log();
    console.log(`  ${primary('🛠️  Skills & Technologies')}`);
    console.log(divider(50));
    console.log();

    skillsList.forEach(category => {
        console.log(chalk.hex('#1e293b')(' ╭───────────────────────────────────────────────────────────────────────────╮'));
        
        // Title
        const titleLine = ` │ ${chalk.bold.white(`${category.title}`)}`.padEnd(76) + chalk.hex('#1e293b')('│');
        console.log(titleLine);
        
        // Description (wrapping logic for neatness, simplified for 70 chars)
        const descWords = category.description.split(' ');
        let currentLine = '';
        descWords.forEach(word => {
            if ((currentLine + word).length > 68) {
                console.log(` │ ${muted(currentLine.trim())}`.padEnd(76) + chalk.hex('#1e293b')('│'));
                currentLine = word + ' ';
            } else {
                currentLine += word + ' ';
            }
        });
        if (currentLine) {
            console.log(` │ ${muted(currentLine.trim())}`.padEnd(76) + chalk.hex('#1e293b')('│'));
        }
        
        console.log(chalk.hex('#1e293b')(' │                                                                           │'));
        
        // Skills
        let skillsLine = '';
        category.skills.forEach(skill => {
            if ((skillsLine + skill + '  •  ').length > 68) {
                console.log(` │ ${chalk.cyan(skillsLine.trim().replace(/•$/, ''))}`.padEnd(76) + chalk.hex('#1e293b')('│'));
                skillsLine = skill + '  •  ';
            } else {
                skillsLine += skill + '  •  ';
            }
        });
        if (skillsLine) {
            console.log(` │ ${chalk.cyan(skillsLine.trim().replace(/•$/, ''))}`.padEnd(76) + chalk.hex('#1e293b')('│'));
        }

        console.log(chalk.hex('#1e293b')(' ╰───────────────────────────────────────────────────────────────────────────╯'));
        console.log();
    });
}
