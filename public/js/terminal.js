import { Terminal } from './terminal-core.js';
import { renderDirectoryPanel } from './directory-panel.js';

document.addEventListener('DOMContentLoaded', () => {
  const terminal = new Terminal();
  renderDirectoryPanel();
  // Optionally, you can hook into terminal's cd/ls to re-render the panel after navigation
  // For now, re-render after every command
  const origExecuteCommand = terminal.executeCommand.bind(terminal);
  terminal.executeCommand = async function(...args) {
    const result = await origExecuteCommand(...args);
    renderDirectoryPanel();
    return result;
  };
}); 