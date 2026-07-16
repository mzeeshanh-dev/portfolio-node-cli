import ora, { type Ora } from 'ora';
import { getTheme } from './colors.js';

export function createSpinner(text: string): Ora {
    return ora({
        text,
        color: 'cyan',
        spinner: 'dots',
    });
}

export async function withSpinner<T>(text: string, fn: () => Promise<T>): Promise<T> {
    const spinner = createSpinner(text);
    spinner.start();
    try {
        const result = await fn();
        spinner.succeed();
        return result;
    } catch (err) {
        spinner.fail();
        throw err;
    }
}
