import { typeText, printWelcome } from './terminal-ui.js';
import { openDetailsPanel, closeDetailsPanel } from './terminal-details.js';
import { fileSystem } from './file-system.js';
import { renderDirectoryPanel } from './directory-panel.js';

export function terminalCommands(terminal) {
  return {
    async help() {
      const helpText = `\nAvailable commands:\n  <span class='clickable-item' data-cmd='help'>help</span>        - Show this help message\n  <span class='clickable-item' data-cmd='clear'>clear</span>       - Clear the terminal\n  <span class='clickable-item' data-cmd='about'>about</span>       - Show about information\n  <span class='clickable-item' data-cmd='projects'>projects</span>    - List all projects\n  <span class='clickable-item' data-cmd='contact'>contact</span>     - Show contact information\n  <span class='clickable-item' data-cmd='ls'>ls</span>          - List directory contents\n  <span class='clickable-item' data-cmd='cd projects'>cd [dir]</span>    - Change directory\n  <span class='clickable-item' data-cmd='cat about.txt'>cat [file]</span>  - Read file contents\n  <span class='clickable-item' data-cmd='echo hello'>echo [text]</span> - Print text\n  <span class='clickable-item' data-cmd='neofetch'>neofetch</span>    - Show system information\n  <span class='clickable-item' data-cmd='exit'>exit</span>        - Exit the terminal\n    `;
      await typeText(terminal, helpText);
    },
    clear() {
      printWelcome(terminal).then(() => {
        terminal.printPrompt();
      });
    },
    async about() {
      const aboutText = `\nAZNET - Terminal Interface\nVersion: 1.0.0\nCreated with ❤️ by Hugo Villeneuve\n\nHi, I'm Hugo! I build tools for gamers and devs who want more than just pretty interfaces.\nThis is a modern terminal-style interface for the AzNet community.\nNavigate through our content using terminal commands or by clicking the menu.\n    `;
      await typeText(terminal, aboutText);
    },
    async projects() {
      const projects = window.PROJECTS || [];
      let output = 'Available projects:\n\n';
      const clickableMap = {};
      projects.forEach(project => {
        output += `<span class='clickable-item' data-cmd='cat ${project.name.toLowerCase()}'>${project.name}</span> – ${project.description}\n`;
        clickableMap[project.name] = `cat ${project.name.toLowerCase()}`;
      });
      await typeText(terminal, output, '', clickableMap);
    },
    async contact() {
      const contactText = `\nContact Information:\nEmail: contact@aznet.com\nTwitter: @aznet\nGitHub: github.com/aznet\n    `;
      await typeText(terminal, contactText);
    },
    async ls() {
      const items = fileSystem.listDirectory();
      if (items.length === 0) {
        await typeText(terminal, 'Directory is empty');
        return;
      }
      const output = items.map(item => {
        const typeIndicator = item.type === 'directory' ? '/' : '';
        return `${item.name}${typeIndicator}`;
      }).join('\n');
      await typeText(terminal, output);
    },
    async cd(args) {
      if (!args || args.length === 0) {
        await typeText(terminal, 'Usage: cd <directory>');
        return;
      }
      const success = fileSystem.changeDirectory(args[0]);
      if (!success) {
        await typeText(terminal, `cd: ${args[0]}: No such directory`);
        return;
      }
      renderDirectoryPanel();
    },
    async pwd() {
      await typeText(terminal, fileSystem.getPathString());
    },
    async cat(args) {
      if (!args || args.length === 0) {
        await typeText(terminal, 'Usage: cat <file>');
        return;
      }
      // Check if the argument matches a project in window.PROJECTS
      const projects = window.PROJECTS || [];
      const argName = args[0].toLowerCase();
      const project = projects.find(p => p.name.toLowerCase() === argName);
      if (project) {
        openDetailsPanel(terminal, project);
        return;
      }
      // Fallback to virtual file system
      const content = fileSystem.getFileContent(argName);
      if (content === null) {
        await typeText(terminal, `cat: ${args[0]}: No such file`);
        return;
      }
      await typeText(terminal, content);
    },
    async echo(args) {
      await typeText(terminal, args.join(' '));
    },
    async neofetch() {
      const neofetchText = `\nvisitor@aznet\n------------\nOS: AZNET Terminal 1.0.0\nHost: Web Browser\nShell: Custom Terminal\nTerminal: AZNET Terminal\nCPU: JavaScript Engine\nMemory: Dynamic\nUptime: ${Math.floor(performance.now() / 1000)}s\n    `;
      await typeText(terminal, neofetchText);
    },
    async exit() {
      if (terminal.detailsPanel.classList.contains('open')) {
        closeDetailsPanel(terminal);
        return;
      }
      await typeText(terminal, 'Goodbye!', 'success');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }
  };
} 