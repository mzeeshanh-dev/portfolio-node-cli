import Conf from 'conf';
import type { CLIConfig } from '../types/index.js';

// ─── Default Config ─────────────────────────────────────

const defaults: CLIConfig = {
    lastSync: null,
};

// ─── Config Store ───────────────────────────────────────

const config = new Conf<CLIConfig>({
    projectName: 'zeeshan-cli',
    defaults,
});

// ─── Getters ────────────────────────────────────────────

export function getConfig(): CLIConfig {
    return {
        lastSync: config.get('lastSync') as string | null,
    };
}

// ─── Setters ────────────────────────────────────────────

export function setLastSync(date: string): void {
    config.set('lastSync', date);
}


export function resetConfig(): void {
    config.clear();
}

// ─── Helpers ────────────────────────────────────────────

export function getLastSyncLabel(): string {
    const lastSync = config.get('lastSync') as string | null;
    if (!lastSync) return 'Never';

    const diff = Date.now() - new Date(lastSync).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
}
