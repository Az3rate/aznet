import { logDebug } from './debug.js';

export function appendPrompt(terminal) {
  logDebug('appendPrompt called', { terminal });
  // Remove any existing input fields from .command-line
  const commandLine = document.querySelector('.command-line');
  if (commandLine) {
    commandLine.innerHTML = '';
    let promptDiv = document.createElement('div');
    promptDiv.className = 'prompt-block';
    promptDiv.innerHTML = `<span class="prompt">${terminal.prompt}</span> <input type="text" class="command-input" autofocus>`;
    commandLine.appendChild(promptDiv);
    terminal.input = promptDiv.querySelector('.command-input');
    terminal.input.focus();
    if (typeof terminal.setupInputEventListeners === 'function') {
      terminal.setupInputEventListeners();
    }
  }
  scrollToBottom(terminal);
}

// Check for first-time user in localStorage
function isFirstTimeUser() {
  return !localStorage.getItem('aznet_terminal_visited');
}

function setFirstTimeUserFlag() {
  localStorage.setItem('aznet_terminal_visited', 'true');
}

export async function printWelcome(terminal) {
  const projects = window.PROJECTS || [];
  let welcomeText = `\n`;
  welcomeText += `<span class='ascii-art'>
    █████╗ ███████╗███╗   ██╗███████╗████████╗\n   ██╔══██╗╚══███╔╝████╗  ██║██╔════╝╚══██╔══╝\n   ███████║  ███╔╝ ██╔██╗ ██║█████╗     ██║   \n   ██╔══██║ ███╔╝  ██║╚██╗██║██╔══╝     ██║   \n   ██║  ██║███████╗██║ ╚████║███████╗   ██║   \n   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚══════╝   ╚═╝   \n</span>\n`;
  welcomeText += `<div style='margin: 18px 0 10px 0; color: #28c840; font-size:1.2em;'><b>Welcome to AZNET Terminal Interface</b></div>`;
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

  // First-time user hint system
  if (isFirstTimeUser()) {
    welcomeText += `<div class='first-time-hint' style='margin-top:24px;padding:16px;background:#232323;border:1px solid #444;border-radius:8px;color:#fff;'>
      <b>First time here?</b><br>
      <ul style='margin:10px 0 0 18px;padding:0;font-size:1em;'>
        <li>Try typing <span class='clickable-item' data-cmd='help'>help</span> to see all available commands.</li>
        <li>Click any <span style='color:#5f87ff;'>blue</span> command or project name to run it instantly.</li>
        <li>Use <b>Tab</b> for autocomplete and <b>Arrow keys</b> for command history.</li>
        <li>Type <span class='clickable-item' data-cmd='about'>about</span> to learn more about this project.</li>
      </ul>
    </div>`;
    setFirstTimeUserFlag();
  }

  terminal.content.innerHTML = '';
  const div = document.createElement('div');
  div.innerHTML = welcomeText;
  terminal.content.appendChild(div);
  appendPrompt(terminal);
  scrollToBottom(terminal);
}

export async function typeText(terminal, text, className = '', clickableMap = null) {
  terminal.isProcessing = true;
  const lines = text.split('\n');
  for (const line of lines) {
    const div = document.createElement('div');
    div.className = className;
    let html = line;
    for (const [token, cmd] of Object.entries(clickableMap || {})) {
      const regex = new RegExp(token, 'g');
      html = html.replace(regex, `<span class='clickable-item' data-cmd="${cmd}">${token}</span>`);
    }
    div.innerHTML = html;
    terminal.content.appendChild(div);
    terminal.content.appendChild(document.createElement('br'));
  }
  appendPrompt(terminal);
  terminal.isProcessing = false;
}

export function printCommand(terminal, command) {
  const div = document.createElement('div');
  div.className = 'command-block';
  div.innerHTML = `
    <div style="background:#232323;padding:18px 24px;border-radius:8px;margin-bottom:18px;">
      <span class="prompt" style="color:#28c840;">visitor@aznet:~$</span>
      <span>${command}</span>
    </div>
  `;
  terminal.content.appendChild(div);
}

export function scrollToBottom(terminal) {
  logDebug('scrollToBottom called', { terminal });
  // Use both requestAnimationFrame and setTimeout to ensure reliable scrolling
  requestAnimationFrame(() => {
    terminal.content.scrollTop = terminal.content.scrollHeight;
    // Add a small delay to handle cases where content might still be rendering
    setTimeout(() => {
      terminal.content.scrollTop = terminal.content.scrollHeight;
      logDebug('scrollToBottom: after setTimeout', { scrollTop: terminal.content.scrollTop, scrollHeight: terminal.content.scrollHeight });
    }, 50);
  });
}

// Add new function to handle scroll events
export function setupScrollHandler(terminal) {
  // Create a ResizeObserver to detect content changes
  const resizeObserver = new ResizeObserver(() => {
    scrollToBottom(terminal);
  });
  
  // Observe the terminal content
  resizeObserver.observe(terminal.content);
  
  // Also observe the command input area
  const commandLine = document.querySelector('.command-line');
  if (commandLine) {
    resizeObserver.observe(commandLine);
  }
  
  return resizeObserver;
} 