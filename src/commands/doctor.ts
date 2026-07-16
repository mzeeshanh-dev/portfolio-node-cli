import chalk from 'chalk';
import { getCacheSize } from '../services/cache.service.js';
import { getConfig } from '../services/config.service.js';
import { primary, muted, dim, divider, success } from '../ui/colors.js';
import axios from 'axios';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function doctorCommand(): Promise<void> {
    console.log(`\n  ${primary('Zeeshan CLI Diagnostics')}`);
    console.log(divider(40));
    console.log();

    // Internet Connection
    let internet = false;
    try {
        await axios.get('https://google.com', { timeout: 3000 });
        internet = true;
    } catch {
        try {
            await axios.get('https://1.1.1.1', { timeout: 3000 });
            internet = true;
        } catch {}
    }

    console.log(`  ${internet ? success('✔') : chalk.red('✖')}  ${chalk.white('Internet Connection')}`);

    // Cache
    const size = getCacheSize();
    console.log(`  ${success('✔')}  ${chalk.white('Cache')} ${dim(`(${size})`)}`);

    // GitHub API
    let githubApi = false;
    try {
        await axios.get('https://api.github.com/users/mzeeshanh-dev', { timeout: 3000 });
        githubApi = true;
    } catch {}
    console.log(`  ${githubApi ? success('✔') : chalk.red('✖')}  ${chalk.white('GitHub API')}`);

    // Portfolio API
    let portfolioApi = false;
    try {
        await axios.get('https://m-zeeshan-haider.vercel.app/api/projects', { timeout: 3000 });
        portfolioApi = true;
    } catch (error: any) {
        if (error.response?.status === 401) {
            portfolioApi = true;
        }
    }
    console.log(`  ${portfolioApi ? success('✔') : chalk.red('✖')}  ${chalk.white('Portfolio API')}`);

    console.log();

    // CLI Version
    try {
        const pkg = JSON.parse(readFileSync(path.join(__dirname, '../../package.json'), 'utf8'));
        console.log(`  ${muted('CLI Version'.padEnd(15))} ${chalk.white(pkg.version)}`);
    } catch {}

    // Config
    const config = getConfig();
    let timeAgo = 'Never';
    if (config.lastSync) {
        const diff = Date.now() - new Date(config.lastSync).getTime();
        const minutes = Math.floor(diff / 60000);
        if (minutes < 1) timeAgo = 'Just now';
        else if (minutes < 60) timeAgo = `${minutes} mins ago`;
        else timeAgo = `${Math.floor(minutes / 60)} hours ago`;
    }
    
    console.log(`  ${muted('Last Sync'.padEnd(15))} ${chalk.white(timeAgo)}`);
    console.log();
}
