import { describe, it, expect, vi, beforeEach } from 'vitest';
import { aboutCommand } from '../src/commands/about.js';

vi.mock('../src/services/portfolio.service.js', () => ({
    getProfile: vi.fn().mockReturnValue({
        name: 'Test User',
        title: 'Tester',
        roles: ['Developer'],
        company: 'Earth',
        location: 'Remote',
        email: 'test@example.com'
    }),
    getExperience: vi.fn().mockResolvedValue([])
}));

describe('About Command', () => {
    beforeEach(() => {
        vi.spyOn(console, 'log').mockImplementation(() => {});
    });

    it('should execute without throwing errors', async () => {
        await expect(aboutCommand()).resolves.not.toThrow();
        expect(console.log).toHaveBeenCalled();
    });
});
