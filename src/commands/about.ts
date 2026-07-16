import chalk from 'chalk';
import { getProfile, getExperience } from '../services/portfolio.service.js';
import { primary, muted, dim, divider, label, success } from '../ui/colors.js';

export async function aboutCommand(): Promise<void> {
    const profile = getProfile();
    const experiences = await getExperience();
    const education = experiences.find(e => e.isEducation);

    let eduString = '';
    if (education) {
        // Extract CGPA if exists in description
        const cgpaMatch = education.description.match(/[\d.]+\s*CGPA/i);
        const cgpa = cgpaMatch ? cgpaMatch[0] : '';
        
        // Calculate time since graduation
        let timeAgo = '';
        if (education.endDate) {
            const end = new Date(education.endDate);
            if (!isNaN(end.getTime())) {
                const now = new Date();
                const diffMonths = (now.getFullYear() - end.getFullYear()) * 12 + (now.getMonth() - end.getMonth());
                if (diffMonths > 0) {
                    const years = Math.floor(diffMonths / 12);
                    const months = diffMonths % 12;
                    if (years > 0) timeAgo = `${years} year${years > 1 ? 's' : ''} ago`;
                    else timeAgo = `${months} month${months > 1 ? 's' : ''} ago`;
                } else {
                    timeAgo = 'Recently Graduated';
                }
            }
        }
        
        eduString = `${education.role} ${cgpa ? `(${cgpa})` : ''} ${timeAgo ? dim(`— ${timeAgo}`) : ''}`;
    }

    console.log(`\n  👋  Hi, I'm ${chalk.white(profile.name)}\n`);
    
    console.log(chalk.hex('#1e293b')('╭─────────────────────────────────────────────────────────────╮'));
    console.log(chalk.hex('#1e293b')('│') + '                                                             ' + chalk.hex('#1e293b')('│'));
    console.log(chalk.hex('#1e293b')('│') + label('Role', profile.title).padEnd(61 + (label('Role', profile.title).length - 61)) + chalk.hex('#1e293b')('│'));
    console.log(chalk.hex('#1e293b')('│') + label('Company', profile.company).padEnd(61 + (label('Company', profile.company).length - 61)) + chalk.hex('#1e293b')('│'));
    console.log(chalk.hex('#1e293b')('│') + label('Location', profile.location).padEnd(61 + (label('Location', profile.location).length - 61)) + chalk.hex('#1e293b')('│'));
    if (eduString) {
        console.log(chalk.hex('#1e293b')('│') + label('Education', eduString).padEnd(61 + (label('Education', eduString).length - 61)) + chalk.hex('#1e293b')('│'));
    }
    console.log(chalk.hex('#1e293b')('│') + label('Focus', 'Agritech • GIS • Remote Sensing').padEnd(61 + (label('Focus', 'Agritech • GIS • Remote Sensing').length - 61)) + chalk.hex('#1e293b')('│'));
    console.log(chalk.hex('#1e293b')('│') + label('Status', `🟢 ${profile.status}`).padEnd(61 + (label('Status', `🟢 ${profile.status}`).length - 61)) + chalk.hex('#1e293b')('│'));
    console.log(chalk.hex('#1e293b')('│') + '                                                             ' + chalk.hex('#1e293b')('│'));
    console.log(chalk.hex('#1e293b')('╰─────────────────────────────────────────────────────────────╯'));
    console.log();

    console.log(`  ${primary('Engineering Philosophy')}`);
    console.log(divider(55));
    console.log();
    
    console.log(`  • ${chalk.white('Business-first engineering')}`);
    console.log(`    ${muted('Every project starts with understanding the problem before writing code.')}`);
    console.log();
    
    console.log(`  • ${chalk.white('End-to-end development')}`);
    console.log(`    ${muted('From planning and architecture to backend, frontend, deployment, and improvements.')}`);
    console.log();
    
    console.log(`  • ${chalk.white('Cross-industry experience')}`);
    console.log(`    ${muted('Software across Agritech, GIS, SaaS, e-commerce, and business platforms.')}`);
    console.log();

    console.log(`  ${dim('[Full Stack Engineering]')}  ${dim('[SaaS & Web Apps]')}  ${dim('[E-commerce]')}`);
    console.log(`  ${dim('[Dashboards]')}  ${dim('[Agritech & GIS]')}  ${dim('[AI Integrations]')}`);
    console.log();
}
