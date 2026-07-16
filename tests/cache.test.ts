import { describe, it, expect, beforeEach, vi } from 'vitest';
import { readCache, writeCache } from '../src/services/cache.service.js';
import fs from 'node:fs';

vi.mock('node:fs', async (importOriginal) => {
    const actual = await importOriginal<typeof import('node:fs')>();
    return {
        default: {
            ...actual,
            existsSync: vi.fn(),
            readFileSync: vi.fn(),
            writeFileSync: vi.fn(),
            mkdirSync: vi.fn(),
            readdirSync: vi.fn(),
            unlinkSync: vi.fn(),
            statSync: vi.fn()
        }
    };
});

describe('Cache Service', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('should return null when reading missing cache', () => {
        vi.mocked(fs.existsSync).mockReturnValue(false);
        const data = readCache('test-key');
        expect(data).toBeNull();
    });

    it('should read valid cache', () => {
        vi.mocked(fs.existsSync).mockReturnValue(true);
        vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({ data: { message: 'hello' }, timestamp: Date.now() }));
        const data = readCache<{ message: string }>('test-key');
        expect(data).toEqual({ message: 'hello' });
    });

    it('should write cache without throwing', () => {
        vi.mocked(fs.existsSync).mockReturnValue(false);
        expect(() => writeCache('test-key', { foo: 'bar' })).not.toThrow();
        expect(fs.writeFileSync).toHaveBeenCalled();
    });
});
