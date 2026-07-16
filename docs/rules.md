# Developer Rules & Guidelines

1. **Strict TypeScript**: No `any`. Define all interfaces in `src/types/index.ts`.
2. **ES Modules Only**: The project is strictly ESM. Use `.js` extensions in relative imports (e.g., `import { foo } from './foo.js'`).
3. **No Uncaught Exceptions**: All network requests and file system operations must be wrapped in `try/catch`. The CLI must never crash with a raw stack trace.
4. **Aesthetics over Flash**: Use colors purposefully. Stick to the defined themes in `src/ui/colors.ts`. Avoid massive ASCII art that requires users to scroll up.
5. **Separation of Concerns**: 
   - Commands (`src/commands/`) should not contain complex styling logic; they should use helpers from `src/ui/`.
   - UI components (`src/ui/`) should not fetch data; they should receive it as arguments.
   - Services (`src/services/`) should handle all data retrieval and caching.
6. **Graceful Degradation**: Always assume the user has a terrible internet connection. Fall back to cache seamlessly.
7. **No Console.log Sprawl**: Use structured logging or specific UI helpers. Don't leave debugging `console.log` statements in the code.
