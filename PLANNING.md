# PLANNING.md

## Current Work in Progress
- Automated tests and CI/CD pipeline are complete and working (2024-06-10)
- Expanding documentation for contributors and users (In Progress)
  - Adding CONTRIBUTING.md
  - Adding contributor section to README.md
- Added architecture diagrams for all projects as static images
- Updated project data to include architectureImage fields
- Details panel now displays architecture diagrams alongside project information
- **Expected Behavior:** When viewing a project (via click or `cat` command), the details panel should show the project's architecture diagram if available
- **User Action Required:** Please test by viewing any project (e.g., `cat d4ut` or `cat raidalert`) and confirm that the architecture diagram appears in the details panel
- Refactored terminal.js into modular ES modules (terminal-core.js, terminal-commands.js, terminal-ui.js, terminal-details.js).
- Updated the script tag in index.ejs to use type="module" for ES module support in the browser.
- Fixed missing import of closeDetailsPanel in terminal-commands.js, which prevented the project details panel from opening when using the cat command.
- **Expected Behavior:** Clicking or typing `cat <project>` opens the project details panel on the right side as intended.
- **User Action Required:** Please test by clicking or typing `cat lootmanager` (or another project). Confirm if the details panel opens as expected. If not, describe the result so we can inspect and resolve.
- Terminal input field is now always rendered at the bottom, outside the scrollable output, for true terminal UX (2024-06-09).

## Project: AzNet Terminal Interface

### Architecture Overview
- **Backend:** Node.js with Express.js, serving EJS-rendered pages and static assets.
- **Frontend:** EJS templates, custom JavaScript for terminal emulation, Tailwind CSS and custom CSS for styling.
- **Data:** Project metadata is managed in a structured JavaScript object in `app.js`.
- **Static Assets:** Located in `public/` (images, CSS, JS).

### Goals
- Provide a professional, brand-forward portal for AzNet projects.
- Offer a terminal-inspired interface for both power users and general visitors.
- Ensure extensibility for new projects and features.
- Maintain a strong, consistent AzNet brand identity.

### Style & UX
- Minimalist, dark-themed, terminal-inspired UI.
- Clear visual hierarchy, strong typography, and accessible color contrast.
- Responsive design for desktop and mobile.
- Professional, direct tone in all messaging and documentation.
- Input field is always at the bottom, never scrolls away, and only one is present at a time (2024-06-09).

### Constraints
- No file should exceed 500 lines; refactor into modules if necessary.
- Use clear, consistent naming conventions and file structure.
- All new features and tasks must be documented in TASK.md.
- All code must be understandable to a mid-level developer, with comments for non-obvious logic.
- Only use verified, well-supported Node.js and frontend libraries.
- The AI must always make all code, data, and config changes itself and never ask the user to do manual steps.
- When moving to a new task, the AI must:
  - Select the highest priority task from TASK.md
  - Update TASK.md to reflect the new work
  - Update PLANNING.md to reflect the new work
  - Update README.md to reflect the new work
  - Make all necessary code changes
  - Provide clear testing instructions
  - Never ask the user to make manual changes

### File Structure (Recommended)
- `app.js`