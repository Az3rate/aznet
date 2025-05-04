# TASK.md

## Current Tasks
- [x] Fix terminal autoscroll issue (2024-06-09)
- [x] Fix project details panel not opening with `cat` command (2024-06-09)
- [x] Add architecture diagrams for all projects (2024-06-10)
  - [x] Convert Mermaid diagrams to static images
  - [x] Add images to project data
  - [x] Update details panel to display architecture diagrams
- [ ] Implement virtual file system for advanced terminal emulation
  - [x] Create directory structure matching project categories
  - [x] Make ls command context-aware
  - [x] Implement cd command with directory navigation
  - [x] Add pwd command support
  - [x] Add directory path in prompt
  - [x] Implement tab completion for directories
  - [x] Add .. support for parent directory
- [x] Add persistent left panel with directory tree
  - [x] Panel is always visible
  - [x] Shows tree structure of virtual file system
  - [x] Visually indicates current directory (cd location) — Complete and working as intended
- [x] Ensure terminal autoscroll always works after output or suggestions (2024-06-10)
- [x] Refactor terminal output, prompt, and scroll management for robustness and glitch-free experience (Fixed input focus, prompt duplication, and autocomplete issues on 2024-06-09)
- [x] Review and refactor any file approaching 500 lines (2024-06-10)
  - [x] All modular files are under 150 lines
- [x] Add error handling for missing images in details panel (2024-06-10)
- [x] Enhance error handling and suggestions for mistyped commands (2024-06-10)
  - [x] Add fuzzy matching for command suggestions
  - [x] Add "did you mean" suggestions for mistyped commands
  - [x] Add command usage examples in error messages
- [x] Add automated tests and CI/CD pipeline (2024-06-10)
  - [x] Set up Jest for JS unit testing
  - [x] Add a sample test for terminal-commands.js
  - [x] Add GitHub Actions workflow for CI
  - [x] Document test and CI setup in README.md
- [x] Expand documentation for contributors and users (2024-06-10)
  - [x] Add a CONTRIBUTING.md file
  - [x] Add a section in README.md for contributors
  - [x] Add a Code of Conduct
- [x] Enhance onboarding for new users in the terminal (2024-06-10)
  - [x] Add a welcome message with tips
  - [x] Add a first-time user guide or hint system

## Completed Tasks
- [x] Initial project setup and structure
- [x] Implement terminal-style interface and command handling
- [x] Add project metadata and details panel
- [x] Ensure accessibility and responsive design
- [x] Update branding and personal attribution (Hugo Villeneuve, AzNet)
- [x] Refactor terminal.js into modular ES modules
- [x] Update script tag to use type="module" for ES module support
- [x] Fix command mapping in terminal-commands.js to match terminal command names (cat, ls, cd) — Confirmed working by user, project details panel now opens as expected.
- [x] Fix context-aware directory navigation in terminal (ls/cd) — Singleton file system, unified command dispatch, and working prompt after modularization. Confirmed fix in code.
- [x] Terminal input field is now always at the bottom, outside the scrollable output, matching real terminal behavior (2024-06-09)

## Future Tasks
- [ ] Expand documentation for contributors and users 