class Terminal {
  constructor() {
    this.commands = {
      help: this.help.bind(this),
      clear: this.clear.bind(this),
      about: this.about.bind(this),
      projects: this.projects.bind(this),
      contact: this.contact.bind(this),
      ls: this.list.bind(this),
      cd: this.changeDirectory.bind(this),
      cat: this.readFile.bind(this),
      echo: this.echo.bind(this),
      neofetch: this.neofetch.bind(this),
      exit: this.exit.bind(this)
    };
    
    this.history = [];
    this.historyIndex = -1;
    this.currentDirectory = '~';
    this.isProcessing = false;
    
    this.init();
  }

  init() {
    this.terminal = document.querySelector('.terminal');
    this.terminalWrapper = document.querySelector('.terminal-wrapper');
    this.content = document.querySelector('.terminal-content');
    this.input = document.querySelector('.command-input');
    this.prompt = document.querySelector('.prompt');
    this.detailsPanel = document.getElementById('details-panel');
    
    this.setupEventListeners();
    this.printWelcome().then(() => {
      this.printPrompt();
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

    // Add clickable commands
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
        this.closeDetailsPanel();
      }
    });
  }

  async printWelcome() {
    // Rich, interactive welcome screen
    const projects = window.PROJECTS || [];
    let welcomeText = `\n`;
    welcomeText += `<span class='ascii-art'>
    █████╗ ███████╗███╗   ██╗███████╗████████╗\n   ██╔══██╗╚══███╔╝████╗  ██║██╔════╝╚══██╔══╝\n   ███████║  ███╔╝ ██╔██╗ ██║█████╗     ██║   \n   ██╔══██║ ███╔╝  ██║╚██╗██║██╔══╝     ██║   \n   ██║  ██║███████╗██║ ╚████║███████╗   ██║   \n   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚══════╝   ╚═╝   \n</span>\n`;
    welcomeText += `<div style='margin: 18px 0 10px 0; color: #28c840;'>Welcome to AZNET Terminal Interface</div>`;
    welcomeText += `<div style='margin-bottom: 10px; color: #5f87ff;'>Created with <span style='color:#ff5f57;'>♥</span> by <b>Hugo Villeneuve</b></div>`;
    welcomeText += `<div style='margin-bottom: 18px;'>Type <span class='clickable-item' data-cmd='help'>help</span> or click a command below to get started.</div>`;
    welcomeText += `<div style='margin-bottom: 10px;'><b>Quick Menu:</b></div>`;
    welcomeText += `<div style='margin-bottom: 10px;'>
      <span class='clickable-item' data-cmd='about'>about</span> | 
      <span class='clickable-item' data-cmd='projects'>projects</span> | 
      <span class='clickable-item' data-cmd='contact'>contact</span> | 
      <span class='clickable-item' data-cmd='ls'>ls</span> | 
      <span class='clickable-item' data-cmd='neofetch'>neofetch</span>
    </div>`;
    
    if (projects.length > 0) {
      welcomeText += `<div style='margin-bottom: 10px;'><b>Projects:</b></div>`;
      projects.forEach(project => {
        welcomeText += `<span class='clickable-item' data-cmd='cat ${project.name.toLowerCase()}'>${project.name}</span> – ${project.description}<br/>`;
      });
    }
    
    welcomeText += `<div style='margin-top: 18px; color: #5f87ff;'>You can also type commands directly, just like a real terminal.</div>`;
    
    this.content.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = welcomeText;
    this.content.appendChild(div);
    this.scrollToBottom();
  }

  async typeText(text, className = '', clickableMap = {}) {
    this.isProcessing = true;
    const lines = text.split('\n');
    for (const line of lines) {
      const div = document.createElement('div');
      div.className = className;
      let html = line;
      for (const [token, cmd] of Object.entries(clickableMap)) {
        const regex = new RegExp(token, 'g');
        html = html.replace(regex, `<span class='clickable-item' data-cmd="${cmd}">${token}</span>`);
      }
      div.innerHTML = html;
      this.content.appendChild(div);
      this.content.appendChild(document.createElement('br'));
    }
    this.scrollToBottom();
    this.isProcessing = false;
  }

  scrollToBottom() {
    this.content.scrollTop = this.content.scrollHeight;
  }

  printPrompt() {
    this.prompt.textContent = `visitor@aznet:${this.currentDirectory}$`;
    this.input.focus();
  }

  async executeCommand() {
    const command = this.input.value.trim();
    if (!command) return;
    this.history.push(command);
    this.historyIndex = this.history.length;
    this.printCommand(command);
    this.input.value = '';
    // Surprise feature: play terminal blip sound
    const audio = document.getElementById('terminal-audio');
    if (audio) { audio.currentTime = 0; audio.play(); }
    const [cmd, ...args] = command.split(' ');
    if (this.commands[cmd]) {
      await this.commands[cmd](args);
    } else {
      await this.typeText(`Command not found: ${cmd}\nTry 'help' for available commands`, 'error');
    }
    this.printPrompt();
    this.scrollToBottom();
  }

  printCommand(command) {
    const div = document.createElement('div');
    div.className = 'command-block';
    div.innerHTML = `
      <div style="background:#232323;padding:18px 24px;border-radius:8px;margin-bottom:18px;">
        <span class="prompt" style="color:#28c840;">visitor@aznet:~$</span>
        <span>${command}</span>
      </div>
    `;
    this.content.appendChild(div);
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

  // Command implementations
  async help() {
    const helpText = `\nAvailable commands:\n  <span class='clickable-item' data-cmd='help'>help</span>        - Show this help message\n  <span class='clickable-item' data-cmd='clear'>clear</span>       - Clear the terminal\n  <span class='clickable-item' data-cmd='about'>about</span>       - Show about information\n  <span class='clickable-item' data-cmd='projects'>projects</span>    - List all projects\n  <span class='clickable-item' data-cmd='contact'>contact</span>     - Show contact information\n  <span class='clickable-item' data-cmd='ls'>ls</span>          - List directory contents\n  <span class='clickable-item' data-cmd='cd projects'>cd [dir]</span>    - Change directory\n  <span class='clickable-item' data-cmd='cat about.txt'>cat [file]</span>  - Read file contents\n  <span class='clickable-item' data-cmd='echo hello'>echo [text]</span> - Print text\n  <span class='clickable-item' data-cmd='neofetch'>neofetch</span>    - Show system information\n  <span class='clickable-item' data-cmd='exit'>exit</span>        - Exit the terminal\n    `;
    await this.typeText(helpText);
  }

  clear() {
    this.printWelcome().then(() => {
      this.printPrompt();
    });
  }

  async about() {
    const aboutText = `\nAZNET - Terminal Interface\nVersion: 1.0.0\nCreated with ❤️ by Hugo Villeneuve\n\nHi, I'm Hugo! I build tools for gamers and devs who want more than just pretty interfaces.\nThis is a modern terminal-style interface for the AzNet community.\nNavigate through our content using terminal commands or by clicking the menu.\n    `;
    await this.typeText(aboutText);
  }

  async projects() {
    const projects = window.PROJECTS || [];
    let output = 'Available projects:\n\n';
    const clickableMap = {};
    projects.forEach(project => {
      output += `<span class='clickable-item' data-cmd='cat ${project.name.toLowerCase()}'>${project.name}</span> – ${project.description}\n`;
      clickableMap[project.name] = `cat ${project.name.toLowerCase()}`;
    });
    await this.typeText(output, '', clickableMap);
  }

  async contact() {
    const contactText = `\nContact Information:\nEmail: contact@aznet.com\nTwitter: @aznet\nGitHub: github.com/aznet\n    `;
    await this.typeText(contactText);
  }

  async list() {
    const items = [
      { name: 'about.txt', type: 'file' },
      { name: 'projects/', type: 'dir' },
      { name: 'contact.txt', type: 'file' }
    ];
    let output = '';
    const clickableMap = {};
    items.forEach(item => {
      output += `${item.type === 'dir' ? '📁' : '📄'} <span class='clickable-item' data-cmd='${item.type === 'dir' ? `cd ${item.name.replace('/', '')}` : `cat ${item.name}`}'>${item.name}</span>\n`;
      clickableMap[item.name] = item.type === 'dir' ? `cd ${item.name.replace('/', '')}` : `cat ${item.name}`;
    });
    await this.typeText(output, '', clickableMap);
  }

  async changeDirectory(args) {
    const dir = args[0];
    if (!dir || dir === '~') {
      this.currentDirectory = '~';
      await this.typeText('Changed to home directory', 'success');
    } else if (dir === 'projects') {
      this.currentDirectory = '~/projects';
      await this.typeText('Changed to projects directory', 'success');
    } else {
      await this.typeText(`Directory not found: ${dir}`, 'error');
    }
  }

  async readFile(args) {
    const file = args[0];
    const projects = window.PROJECTS || [];
    // Try to match by lowercased name
    const project = projects.find(
      p => p.name.toLowerCase() === file?.toLowerCase()
    );
    if (project) {
      this.openDetailsPanel(project);
      return;
    }
    if (file === 'about.txt') {
      await this.about();
    } else if (file === 'contact.txt') {
      await this.contact();
    } else {
      await this.typeText(`File not found: ${file}`, 'error');
    }
  }

  async echo(args) {
    await this.typeText(args.join(' '));
  }

  async neofetch() {
    const neofetchText = `\nvisitor@aznet\n------------\nOS: AZNET Terminal 1.0.0\nHost: Web Browser\nShell: Custom Terminal\nTerminal: AZNET Terminal\nCPU: JavaScript Engine\nMemory: Dynamic\nUptime: ${Math.floor(performance.now() / 1000)}s\n    `;
    await this.typeText(neofetchText);
  }

  async exit() {
    if (this.detailsPanel.classList.contains('open')) {
      this.closeDetailsPanel();
      return;
    }
    await this.typeText('Goodbye!', 'success');
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  }

  // --- Details Panel Logic ---
  openDetailsPanel(project) {
    this.terminalWrapper.classList.add('terminal-shifted');
    let html = `<button class="details-close-btn" title="Close" aria-label="Close details panel" tabindex="0">&times;</button>`;
    html += `<div class="details-title" tabindex="0">${project.name}</div>`;
    if (project.image) {
      html += `<div class="details-image-wrap"><img src="${project.image}" alt="${project.name} screenshot" class="details-image" style="max-width:100%;border-radius:8px;margin-bottom:1.2rem;box-shadow:0 0 12px #222;" /></div>`;
    }
    if (project.overview) {
      html += `<section class="details-section details-overview"><div class="details-section-title">Project Overview</div><div class="details-section-content">${project.overview}</div></section>`;
    }
    if (project.keyFeatures && project.keyFeatures.length) {
      html += `<section class="details-section details-features"><div class="details-section-title">Key Features</div><ul class="details-list">${project.keyFeatures.map(f => `<li>${f}</li>`).join('')}</ul></section>`;
    }
    if (project.architecture) {
      html += `<section class="details-section details-architecture"><div class="details-section-title">Architecture Flowchart</div><pre class="details-architecture-diagram" style="background:#181818;padding:1rem;border-radius:8px;overflow-x:auto;font-size:0.95em;margin-bottom:1rem;"><code>${project.architecture}</code></pre></section>`;
    }
    if (project.techStack && project.techStack.length) {
      html += `<section class="details-section details-tech"><div class="details-section-title">Technical Stack</div><ul class="details-list">${project.techStack.map(t => `<li><b>${t.name}</b>: ${t.description}</li>`).join('')}</ul></section>`;
    }
    if (project.directoryStructure && project.directoryStructure.length) {
      html += `<section class="details-section details-directory"><div class="details-section-title">Directory Structure (Key Parts)</div><ul class="details-list">${project.directoryStructure.map(d => `<li><code>${d}</code></li>`).join('')}</ul></section>`;
    }
    if (project.apiEndpoints && project.apiEndpoints.length) {
      html += `<section class="details-section details-api"><div class="details-section-title">API Endpoints</div><ul class="details-list">${project.apiEndpoints.map(api => `<li><span class="details-api-method">${api.method}</span> <span class="details-api-path">${api.path}</span> <span class="details-api-desc">${api.description}</span></li>`).join('')}</ul></section>`;
    }
    if (project.workflow && project.workflow.length) {
      html += `<section class="details-section details-workflow"><div class="details-section-title">Development Workflow</div><ul class="details-list">${project.workflow.map(w => `<li>${w}</li>`).join('')}</ul></section>`;
    }
    if (project.summary) {
      html += `<section class="details-section details-summary"><div class="details-section-title">Summary</div><div class="details-section-content">${project.summary}</div></section>`;
    }
    html += `<section class="details-section details-link"><a href="${project.url}" target="_blank" rel="noopener noreferrer" class="details-link-btn">Visit Project &rarr;</a></section>`;
    this.detailsPanel.innerHTML = html;
    this.detailsPanel.classList.add('open');
    // Accessibility: focus the close button
    const closeBtn = this.detailsPanel.querySelector('.details-close-btn');
    if (closeBtn) closeBtn.focus();
  }

  closeDetailsPanel() {
    this.terminalWrapper.classList.remove('terminal-shifted');
    this.detailsPanel.classList.remove('open');
    setTimeout(() => {
      this.detailsPanel.innerHTML = '';
    }, 500);
    this.input.focus();
  }

  // --- Auto-complete placeholders (optional) ---
  showAutoComplete() {}

  autoComplete() {}
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Terminal();
}); 