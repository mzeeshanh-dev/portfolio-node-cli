import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { getProjects, getProfile, getSkills } from '../src/services/portfolio.service.js';

vi.mock('axios');
vi.mock('../src/services/cache.service.js', () => ({
    readCache: vi.fn(),
    writeCache: vi.fn(),
    isCacheFresh: vi.fn().mockReturnValue(false)
}));
vi.mock('../src/services/config.service.js', () => ({
    setLastSync: vi.fn(),
    getConfig: vi.fn()
}));

describe('Portfolio Service (Projects)', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('should return hardcoded profile and skills without API call', () => {
        const profile = getProfile();
        const skills = getSkills();
        
        expect(profile.name).toBe('M. Zeeshan Haider');
        expect(skills.length).toBeGreaterThan(0);
        expect(axios.get).not.toHaveBeenCalled();
    });

    it('should fetch projects from API', async () => {
        const mockProjects = [{ _id: '1', title: 'Test Project', tags: [] }];
        vi.mocked(axios.get).mockResolvedValue({ data: mockProjects });
        
        const data = await getProjects(true);
        expect(data).toEqual(mockProjects);
    });

    it('should return fallback projects if API fails', async () => {
        vi.mocked(axios.get).mockRejectedValue(new Error('Network error'));
        
        const data = await getProjects(true);
        expect(data.length).toBeGreaterThan(0);
        expect(data[0].title).toBeDefined();
    });
});
