# TASK.md

## Current Tasks
- [ ] Implement virtual file system for advanced terminal emulation
  - [ ] Create directory structure matching project categories
  - [ ] Make ls command context-aware
  - [ ] Implement cd command with directory navigation
  - [ ] Add pwd command support
  - [ ] Add directory path in prompt
  - [ ] Implement tab completion for directories
  - [ ] Add .. support for parent directory
- [x] Add persistent left panel with directory tree
  - [x] Panel is always visible
  - [x] Shows tree structure of virtual file system
  - [x] Visually indicates current directory (cd location) — Complete and working as intended
- [ ] Review and refactor any file approaching 500 lines (Ongoing)
- [ ] Add automated tests and CI/CD pipeline (Planned)
- [ ] Expand documentation for contributors and users (Planned)

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

## Discovered During Work
- [ ] Enhance error handling and suggestions for mistyped commands
- [ ] Refactor terminal.js if it approaches 500 lines
- [ ] Add more advanced help and onboarding for new users
- [ ] Always verify command registration matches user input after modularization 