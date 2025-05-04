## 2024-06-09
- Fixed major terminal bugs: input focus, prompt duplication, and autocomplete now work reliably.
- Refactored prompt/input handling: event listeners are re-attached after each prompt, and printPrompt was removed (was undefined).
- If you experience input issues, ensure you are using the latest code and that appendPrompt is called for every new prompt.

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