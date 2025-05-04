# PLANNING.md

## Current Work in Progress
- Refactored terminal.js into modular ES modules (terminal-core.js, terminal-commands.js, terminal-ui.js, terminal-details.js).
- Updated the script tag in index.ejs to use type="module" for ES module support in the browser.
- Fixed missing import of closeDetailsPanel in terminal-commands.js, which prevented the project details panel from opening when using the cat command.
- **Expected Behavior:** Clicking or typing `cat <project>` opens the project details panel on the right side as intended.
- **User Action Required:** Please test by clicking or typing `cat lootmanager` (or another project). Confirm if the details panel opens as expected. If not, describe the result so we can inspect and resolve.

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

### Constraints
- No file should exceed 500 lines; refactor into modules if necessary.
- Use clear, consistent naming conventions and file structure.
- All new features and tasks must be documented in TASK.md.
- All code must be understandable to a mid-level developer, with comments for non-obvious logic.
- Only use verified, well-supported Node.js and frontend libraries.

### File Structure (Recommended)
- `app.js` – Main server and data
- `public/` – Static assets (css, js, images)
- `views/` – EJS templates
- `PLANNING.md` – Project plan (this file)
- `TASK.md` – Task tracking
- `.cursor/rules/my-rule.mdc` – Project rules

### Future Considerations
- Implement a virtual file system for advanced terminal emulation.
- Add automated tests and CI/CD pipeline.
- Expand documentation for contributors and users. 