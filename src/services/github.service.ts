import axios from 'axios';
import { readCache, writeCache, isCacheFresh } from './cache.service.js';
import type { GitHubData } from '../types/index.js';

// ─── Config ─────────────────────────────────────────────

const PORTFOLIO_GITHUB_URL = 'https://m-zeeshan-haider.vercel.app/api/github';
const TIMEOUT = 8000;

// ─── Fetch GitHub Data ──────────────────────────────────

export async function getGitHubData(forceLatest: boolean = false): Promise<GitHubData | null> {
    // Try cache first
    if (!forceLatest && isCacheFresh('github')) {
        const cached = readCache<GitHubData>('github');
        if (cached) return cached;
    }

    try {
        const response = await axios.get<GitHubData>(PORTFOLIO_GITHUB_URL, {
            timeout: TIMEOUT,
            headers: { 'User-Agent': 'zeeshan-cli/1.0.0' },
        });

        const data = response.data;
        writeCache('github', data);
        return data;
    } catch {
        // Fallback to stale cache
        const cached = readCache<GitHubData>('github');
        if (cached) return cached;
        return null;
    }
}
