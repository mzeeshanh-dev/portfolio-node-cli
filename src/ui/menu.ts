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
    | 'exit';

export async function showMainMenu(): Promise<MenuChoice | null> {
    const choice = await p.select({
        message: 'What would you like to explore?',
        options: [
            { value: 'about', label: `${chalk.bold('About Me')}`, hint: 'Who am I?' },
            { value: 'projects', label: `${chalk.bold('Projects')}`, hint: 'SaaS, Agritech & Web' },
            { value: 'experience', label: `${chalk.bold('Experience')}`, hint: 'Work & Education' },
            { value: 'timeline', label: `${chalk.bold('Timeline')}`, hint: 'Career journey' },
            { value: 'skills', label: `${chalk.bold('Skills')}`, hint: 'Tech stack & tools' },
            { value: 'github', label: `${chalk.bold('GitHub')}`, hint: 'Live stats & repos' },
            { value: 'resume', label: `${chalk.bold('Resume')}`, hint: 'View PDF' },
            { value: 'contact', label: `${chalk.bold('Contact')}`, hint: 'Links & Emails' },
            { value: 'hire', label: `${chalk.bold('Hire Me')}`, hint: "Let's work together" },
            { value: 'settings', label: `${dim('Settings')}`, hint: 'Config' },
            { value: 'exit', label: `${dim('Exit')}`, hint: 'Leave CLI' },
        ],
        maxItems: 12,
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
