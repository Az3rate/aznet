// terminal-details.js
export function openDetailsPanel(terminal, project) {
  terminal.terminalWrapper.classList.add('terminal-shifted');
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
  terminal.detailsPanel.innerHTML = html;
  terminal.detailsPanel.classList.add('open');
  const closeBtn = terminal.detailsPanel.querySelector('.details-close-btn');
  if (closeBtn) closeBtn.focus();
}

export function closeDetailsPanel(terminal) {
  terminal.terminalWrapper.classList.remove('terminal-shifted');
  terminal.detailsPanel.classList.remove('open');
  setTimeout(() => {
    terminal.detailsPanel.innerHTML = '';
  }, 500);
  terminal.input.focus();
} 