import { describe, it, expect } from 'vitest';
import { primary, muted, dim, label } from '../src/ui/colors.js';
import chalk from 'chalk';

describe('UI Colors & Utils', () => {
    it('should format strings using theme colors', () => {
        const text = 'Hello';
        expect(primary(text)).toBeDefined();
        expect(muted(text)).toBeDefined();
        expect(dim(text)).toBeDefined();
        expect(typeof primary(text)).toBe('string');
    });

    it('should format labels correctly', () => {
        const result = label('Name', 'Zeeshan');
        expect(result).toContain('Zeeshan');
        // Because of chalk, the exact string will have ANSI codes,
        // so we just check for presence of the raw text.
    });
});
