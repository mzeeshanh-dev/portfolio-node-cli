import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

// ─── Cache Directory ────────────────────────────────────

const CACHE_DIR = path.join(os.homedir(), '.zeeshan-cli');
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

function ensureCacheDir(): void {
    if (!fs.existsSync(CACHE_DIR)) {
        fs.mkdirSync(CACHE_DIR, { recursive: true });
    }
}

// ─── Read / Write ───────────────────────────────────────

export function readCache<T>(key: string): T | null {
    try {
        const filePath = path.join(CACHE_DIR, `${key}.json`);
        if (!fs.existsSync(filePath)) return null;

        const raw = fs.readFileSync(filePath, 'utf-8');
        const cached = JSON.parse(raw) as { data: T; timestamp: number };

        return cached.data;
    } catch {
        return null;
    }
}

export function writeCache<T>(key: string, data: T): void {
    try {
        ensureCacheDir();
        const filePath = path.join(CACHE_DIR, `${key}.json`);
        const payload = JSON.stringify({ data, timestamp: Date.now() }, null, 2);
        fs.writeFileSync(filePath, payload, 'utf-8');
    } catch {
        // Silent fail — cache is best-effort
    }
}

// ─── Freshness Check ────────────────────────────────────

export function isCacheFresh(key: string): boolean {
    try {
        const filePath = path.join(CACHE_DIR, `${key}.json`);
        if (!fs.existsSync(filePath)) return false;

        const raw = fs.readFileSync(filePath, 'utf-8');
        const cached = JSON.parse(raw) as { timestamp: number };
        return Date.now() - cached.timestamp < CACHE_TTL;
    } catch {
        return false;
    }
}

export function getCacheAge(key: string): string {
    try {
        const filePath = path.join(CACHE_DIR, `${key}.json`);
        if (!fs.existsSync(filePath)) return 'No cache';

        const raw = fs.readFileSync(filePath, 'utf-8');
        const cached = JSON.parse(raw) as { timestamp: number };
        const diff = Date.now() - cached.timestamp;

        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    } catch {
        return 'Unknown';
    }
}

// ─── Clear Cache ────────────────────────────────────────

export function clearCache(): void {
    try {
        if (fs.existsSync(CACHE_DIR)) {
            const files = fs.readdirSync(CACHE_DIR);
            for (const file of files) {
                if (file.endsWith('.json')) {
                    fs.unlinkSync(path.join(CACHE_DIR, file));
                }
            }
        }
    } catch {
        // Silent fail
    }
}

export function getCacheSize(): string {
    try {
        if (!fs.existsSync(CACHE_DIR)) return '0 KB';

        let totalSize = 0;
        const files = fs.readdirSync(CACHE_DIR);
        for (const file of files) {
            const stats = fs.statSync(path.join(CACHE_DIR, file));
            totalSize += stats.size;
        }

        if (totalSize < 1024) return `${totalSize} B`;
        return `${Math.round(totalSize / 1024)} KB`;
    } catch {
        return 'Unknown';
    }
}
