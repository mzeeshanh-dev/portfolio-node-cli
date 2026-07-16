import chalk from 'chalk';
import * as p from '@clack/prompts';
import { getConfig, resetConfig, setSound } from '../services/config.service.js';
import { getCacheSize, clearCache } from '../services/cache.service.js';
import { primary, muted, dim, divider, label, success, warning } from '../ui/colors.js';

export async function settingsCommand(): Promise<void> {
    const config = getConfig();

    console.log();
    console.log(`  ${primary('⚙️  Settings')}`);
    console.log(divider(50));
    console.log();

    console.log(label('Sound', config.sound ? 'On' : 'Off'));
    console.log(label('Cache Size', getCacheSize()));
    console.log(label('Last Sync', config.lastSync ? new Date(config.lastSync).toLocaleString() : 'Never'));
    console.log(label('CLI Version', '1.0.0'));
    console.log();

    // Actions
    const action = await p.select({
        message: 'What would you like to do?',
        options: [
            { value: 'back', label: '← Back', hint: '' },
            { value: 'toggle-sound', label: config.sound ? 'Turn Sound Off' : 'Turn Sound On', hint: '' },
            { value: 'clear-cache', label: 'Clear Cache', hint: 'Re-fetch all data' },
            { value: 'reset', label: 'Reset All Settings', hint: 'Back to defaults' },
        ],
    });

    if (p.isCancel(action) || action === 'back') return;

    if (action === 'toggle-sound') {
        setSound(!config.sound);
        console.log(`\n  ${success('✔')}  Sound ${config.sound ? 'disabled' : 'enabled'}\n`);
    }

    if (action === 'clear-cache') {
        clearCache();
        console.log(`\n  ${success('✔')}  Cache cleared\n`);
    }

    if (action === 'reset') {
        const confirm = await p.confirm({ message: 'Reset all settings to defaults?' });
        if (!p.isCancel(confirm) && confirm) {
            resetConfig();
            console.log(`\n  ${success('✔')}  Settings reset to defaults\n`);
        }
    }
}
