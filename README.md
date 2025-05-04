## 2024-06-09
- Fixed major terminal bugs: input focus, prompt duplication, and autocomplete now work reliably.
- Refactored prompt/input handling: event listeners are re-attached after each prompt, and printPrompt was removed (was undefined).
- If you experience input issues, ensure you are using the latest code and that appendPrompt is called for every new prompt.

## 2024-06-10
- Fixed: Duplicate command line for cat
- UI overhaul: Subtle cyberpunk palette, authentic terminal input, and improved layout
  - Subtle neon/cyberpunk color palette
  - Terminal glow and scanline effects
  - Animated prompt and output
  - Enhanced transitions and background animation
  - Details panel now snaps to the right of the terminal with consistent spacing (not flush to viewport edge)
  - All scrollbars (including details panel) use a slim, custom, modern style for visual consistency

## Running Tests

This project uses [Jest](https://jestjs.io/) for unit testing.

To run tests locally:

```sh
npm install
npm test
```

## Continuous Integration (CI)

A GitHub Actions workflow is set up to automatically run all tests on every push and pull request to the `main` branch. See `.github/workflows/ci.yml` for details.

## Project Structure & Architecture

- **Backend:** Node.js with Express.js, serving EJS-rendered pages and static assets.
- **Frontend:** EJS templates, custom JavaScript for terminal emulation, Tailwind CSS and custom CSS for styling.
- **Data:** Project metadata is managed in a structured JavaScript object in `app.js`.
- **Static Assets:** Located in `public/` (images, CSS, JS).
- **Tests:** Located in `public/js/*.test.js` and run with Jest.

## Reporting Issues & Requesting Features

If you find a bug or have a feature request, please [open an issue](https://github.com/your-repo/issues) with a clear description and steps to reproduce or desired functionality. We welcome all feedback and suggestions!

## Contributing

This project is primarily a showcase of my work and abilities. While I am not actively seeking contributors, contributions are welcome if you are interested in trying something or improving the project. Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Onboarding & First-Time User Experience

- When you first open the terminal, you'll see a welcome message with quick tips and clickable commands.
- Type `help` or click the help command for a list of available commands.
- New users will see a special hint box with tips and guidance the first time they visit the terminal interface.
- The details panel now includes improved accessibility: all images have descriptive alt text, and all interactive elements are keyboard accessible.

## Code of Conduct

Participation in this project is governed by a [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a welcoming and inclusive environment.

## UI Overhaul: Retro Cyberpunk/Hacking Style

- Neon and cyberpunk-inspired color palette
- Terminal glow, scanlines, and subtle animated background
- Animated prompt and output for a retro feel
- Enhanced transitions for panels and buttons
- Designed to evoke a classic hacking/cyberpunk terminal vibe 