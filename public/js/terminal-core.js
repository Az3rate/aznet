// terminal-core.js
import { terminalCommands } from './terminal-commands.js';
import { printWelcome, printPrompt, printCommand, scrollToBottom } from './terminal-ui.js';
import { openDetailsPanel, closeDetailsPanel } from './terminal-details.js';
import { fileSystem } from './file-system.js';

export class Terminal {
  constructor() {
    this.history = [];
    this.historyIndex = -1;
    this.currentDirectory = '~';
    this.isProcessing = false;
    this.prompt = '>';
    this.init();
    this.commands = terminalCommands(this);
    this.updatePrompt();
  }

  init() {
    this.terminal = document.querySelector('.terminal');
    this.terminalWrapper = document.querySelector('.terminal-wrapper');
    this.content = document.querySelector('.terminal-content');
    this.input = document.querySelector('.command-input');
    this.detailsPanel = document.getElementById('details-panel');
    this.setupEventListeners();
    printWelcome(this).then(() => {
      printPrompt(this);
    });
  }

  setupEventListeners() {
    this.input.addEventListener('keydown', (e) => {
      if (this.isProcessing) return;
      if (e.key === 'Enter') {
        this.executeCommand();
      } else if (e.key === 'ArrowUp') {
        this.navigateHistory('up');
      } else if (e.key === 'ArrowDown') {
        this.navigateHistory('down');
      } else if (e.key === 'Tab') {
        e.preventDefault();
        this.autoComplete();
      }
    });
    this.content.addEventListener('click', (e) => {
      if (e.target.classList.contains('clickable-item')) {
        const cmd = e.target.getAttribute('data-cmd');
        this.input.value = cmd;
        this.executeCommand();
      } else {
        this.input.focus();
      }
    });
    this.terminal.addEventListener('click', () => {
      this.input.focus();
    });
    this.input.addEventListener('input', () => {
      this.showAutoComplete();
    });
    this.detailsPanel.addEventListener('click', (e) => {
      if (e.target.classList.contains('details-close-btn')) {
        closeDetailsPanel(this);
      }
    });
  }

  updatePrompt() {
    const path = fileSystem.getPathString();
    this.prompt = `${path}>`;
  }

  async executeCommand() {
    const command = this.input.value.trim();
    if (!command) return;
    this.history.push(command);
    this.historyIndex = this.history.length;
    printCommand(this, command);
    this.input.value = '';
    const audio = document.getElementById('terminal-audio');
    if (audio) { audio.currentTime = 0; audio.play(); }
    const [cmd, ...args] = command.split(' ');
    if (this.commands[cmd]) {
      await this.commands[cmd](args);
      this.updatePrompt();
      printPrompt(this);
      scrollToBottom(this);
      return;
    } else {
      await this.commands.help();
    }
    printPrompt(this);
    scrollToBottom(this);
  }

  navigateHistory(direction) {
    if (direction === 'up' && this.historyIndex > 0) {
      this.historyIndex--;
    } else if (direction === 'down' && this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
    }
    if (this.historyIndex >= 0 && this.historyIndex < this.history.length) {
      this.input.value = this.history[this.historyIndex];
    }
  }

  showAutoComplete() {}
  autoComplete() {}
} 