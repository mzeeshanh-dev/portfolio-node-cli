import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { getGitHubData } from '../src/services/github.service.js';

vi.mock('axios');
vi.mock('../src/services/cache.service.js', () => ({
    readCache: vi.fn(),
    writeCache: vi.fn(),
    isCacheFresh: vi.fn().mockReturnValue(false)
}));

describe('GitHub Service', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('should fetch github data correctly', async () => {
        const mockData = {
            profile: { login: 'mzeeshanh-dev', name: 'Zeeshan' },
            languages: [{ name: 'JavaScript', count: 10 }],
            totals: { stars: 5, repositories: 10, contributions: 100 }
        };
        vi.mocked(axios.get).mockResolvedValue({ data: mockData });
        
        const data = await getGitHubData(true); // force latest
        expect(data).toEqual(mockData);
        expect(axios.get).toHaveBeenCalled();
    });

    it('should return null if API fails and cache is empty', async () => {
        vi.mocked(axios.get).mockRejectedValue(new Error('Network error'));
        
        const data = await getGitHubData(true);
        expect(data).toBeNull();
    });
});
