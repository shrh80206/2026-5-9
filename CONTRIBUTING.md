# Contributing

## Guidelines

- Fork the repository or create a feature branch from `main`.
- Branch naming: `feature/<short-description>`, `fix/<short-description>`, `chore/<short-description>`.
- Use Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`.
- Open a Pull Request against `main` and request at least one reviewer.

## Development

- Install dependencies: `npm ci` or `npm install`.
- Run dev server: `npm run dev`.
- Build: `npm run build`.
- Lint: `npm run lint`.

## Code Style

- The project follows rules in `.editorconfig` (2-space indentation, LF, UTF-8).
- Keep functions small and components focused. Use TypeScript types and interfaces.

## Tests

- Add tests next to components where appropriate.

## Deployment

- The repository uses GitHub Actions to deploy to GitHub Pages automatically on push to `main`.
- Do not commit deployed build artifacts; the workflow will publish the `dist` folder.

## Contact

- For questions, open an issue on the repository.
