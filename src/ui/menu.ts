import * as p from '@clack/prompts';
import chalk from 'chalk';
import { dim } from './colors.js';

export type MenuChoice = 
    | 'about' 
    | 'projects' 
    | 'experience' 
    | 'skills' 
    | 'github' 
    | 'resume' 
    | 'contact' 
    | 'hire' 
    | 'timeline' 
    | 'settings'
    | 'update'
    | 'doctor'
    | 'exit';

export async function showMainMenu(): Promise<MenuChoice | null> {
    const options = [
        { value: 'about', label: `${chalk.bold('About Me')} ${dim('- Who am I?')}` },
        { value: 'projects', label: `${chalk.bold('Projects')} ${dim('- SaaS, Agritech & Web')}` },
        { value: 'experience', label: `${chalk.bold('Experience')} ${dim('- Work & Education')}` },
        { value: 'timeline', label: `${chalk.bold('Timeline')} ${dim('- Career journey')}` },
        { value: 'skills', label: `${chalk.bold('Skills')} ${dim('- Tech stack & tools')}` },
        { value: 'github', label: `${chalk.bold('GitHub')} ${dim('- Live stats & repos')}` },
        { value: 'resume', label: `${chalk.bold('Resume')} ${dim('- View PDF')}` },
        { value: 'contact', label: `${chalk.bold('Contact')} ${dim('- Links & Emails')}` },
        { value: 'hire', label: `${chalk.bold('Hire Me')} ${dim("- Let's work together")}` },
        { value: 'doctor', label: `${dim('Doctor')} ${dim('- System diagnostics')}` },
        { value: 'update', label: `${dim('Update')} ${dim('- Force sync latest data')}` },
        { value: 'settings', label: `${dim('Settings')} ${dim('- CLI Config')}` },
        { value: 'exit', label: `${dim('Exit')} ${dim('- Leave CLI')}` },
    ];

    const choice = await p.select({
        message: 'What would you like to explore?',
        options: options,
        maxItems: 13,
    });

    if (p.isCancel(choice)) return null;
    return choice as MenuChoice;
}

export async function promptContinue(): Promise<boolean> {
    const choice = await p.select({
        message: '',
        options: [
            { value: 'continue', label: '←  Back to menu' },
            { value: 'exit', label: 'Exit' }
        ]
    });
    
    return choice === 'continue';
}
