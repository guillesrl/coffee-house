# AGENTS.md - Project Development Guidelines

This file provides guidelines for AI agents working on this codebase.

---

## 1. Development Commands

### Installation & Build
```bash
npm install          # Install dependencies
npm run build        # Build the project
npm run dev          # Start development server
npm run preview      # Preview production build
```

### Linting & Formatting
```bash
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run typecheck    # Run TypeScript type checking
```

### Testing
```bash
npm test             # Run all tests
npm test -- --watch  # Run tests in watch mode
npm test -- --run    # Run tests once (CI mode)
npm test <pattern>   # Run tests matching pattern

# Running a single test
npm test -- --grep "test name"     # Run test by name
npm test -- file.test.ts           # Run specific file
npx vitest run --reporter=verbose  # Verbose output with Vitest
```

---

## 2. Code Style Guidelines

### Imports
- Use absolute imports when possible (via `paths` in tsconfig)
- Group imports: external → internal → relative
- Use named exports instead of default exports
```typescript
import { useState } from 'react'
import { z } from 'zod'
import { useAuth } from '@/hooks/useAuth'
import { utils } from '../utils'
```

### Formatting
- 2 spaces for indentation (no tabs)
- Max line length: 100 characters
- Trailing commas in objects/arrays
- Semicolons at end of statements
- Single quotes for strings

### Types
- Always define return types for functions
- Use interfaces for objects, types for unions/intersections
- Avoid `any` - use `unknown` when type is unknown
```typescript
interface User {
  id: string
  name: string
  email: string
}

type UserRole = 'admin' | 'user' | 'guest'

function getUser(id: string): Promise<User> { /* ... */ }
```

### Naming Conventions
- **Files**: kebab-case (`user-profile.tsx`), camelCase (`formatDate.ts`)
- **Classes/Interfaces**: PascalCase (`UserService`)
- **Functions**: camelCase (`getUserById`)
- **Constants**: UPPER_SNAKE_CASE for config
- **Booleans**: prefixes `is`, `has`, `can`, `should`

### Error Handling
- Use custom error classes extending `Error`
- Never silently catch errors - log or rethrow
- Use Result types or error boundaries
- Example:
```typescript
class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message)
    this.name = 'AppError'
  }
}

throw new AppError('User not found', 'USER_NOT_FOUND', 404)
```

---

## 3. Project Structure
```
src/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── services/       # API integrations
├── types/          # TypeScript types
├── stores/         # State management
└── pages/          # Page routes
```

---

## 4. Git Conventions
- Use conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`
- Keep commits small and focused
- Run lint/typecheck before committing

---

## 5. Testing Guidelines
- Use Vitest or Jest
- Follow AAA pattern: Arrange, Act, Assert
- Test one thing per test case
- Use descriptive test names
```typescript
describe('formatUserName', () => {
  it('should return full name when first and last provided', () => {
    expect(formatUserName('John', 'Doe')).toBe('John Doe')
  })
})
```

---

## 6. UI/Component Guidelines
- Use functional components with hooks
- Extract reusable logic into custom hooks
- Keep components small (single responsibility)
- Use composition over inheritance
- Implement proper accessibility (ARIA labels)

---

## 7. API Development
- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Validate input using Zod
- Return consistent response shapes:
```typescript
// Success
{ success: true, data: { ... } }
// Error
{ success: false, error: { code: 'ERROR', message: '...' } }
```

---

## 8. Performance
- Memoize expensive computations with `useMemo`
- Use `useCallback` for callbacks passed to children
- Implement code splitting with dynamic imports

---

## 9. Security Best Practices
- Never commit secrets or API keys
- Validate and sanitize all user inputs
- Use parameterized queries to prevent SQL injection
- Hash passwords using bcrypt or argon2

---

## 10. Documentation
- Document complex business logic
- Write JSDoc for public functions
- Keep README.md updated with setup instructions
- Document env variables in `.env.example`