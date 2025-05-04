export function appendPrompt(terminal) {
  // Remove any existing input fields
  const oldInputs = terminal.content.querySelectorAll('.command-input');
  oldInputs.forEach(input => input.parentElement && input.parentElement.remove());
  let promptDiv = document.createElement('div');
  promptDiv.className = 'prompt-block';
  promptDiv.innerHTML = `<span class="prompt">${terminal.prompt}</span> <input type="text" class="command-input" autofocus>`;
  terminal.content.appendChild(promptDiv);
  terminal.input = promptDiv.querySelector('.command-input');
  terminal.input.focus();
  if (typeof terminal.setupInputEventListeners === 'function') {
    terminal.setupInputEventListeners();
  }
  scrollToBottom(terminal);
}

export async function printWelcome(terminal) {
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
  requestAnimationFrame(() => {
    terminal.content.scrollTop = terminal.content.scrollHeight;
  });
} 