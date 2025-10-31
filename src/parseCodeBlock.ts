import escapeHtml from './escapeHTML.ts';

export default function parseCodeBlock(
  lines: string[],
  startIndex: number,
  isBackend: boolean,
): { html: string; nextIndex: number } {
  const firstLine = lines[startIndex].trim();
  const delimiter = firstLine.startsWith('```') ? '```' : '~~~';
  const language = firstLine.slice(3).trim();

  let i = startIndex + 1;
  const codeLines: string[] = [];

  while (i < lines.length) {
    if (lines[i].trim().startsWith(delimiter)) {
      break;
    }
    codeLines.push(escapeHtml(lines[i]));
    i++;
  }

  const codeContent = codeLines.join('\n');
  const langClass = language ? ` class="language-${escapeHtml(language)}"` : '';

  // Create unique ID for this code block
  const codeId = `code-${Math.random().toString(36).substring(2, 9)}`;

  const html = `<div class="code-block-container" style="position: relative;">
  <button 
  class="copy-code-btn"
  data-code-id="${codeId}"
   ${isBackend ? '' : `onclick="copyCodeToClipboard('${codeId}')"`}
    title="Copy to clipboard"
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
    <span class="copy-text">Copy</span>
  </button>
  <pre style="margin: 0; padding: 16px; padding-top: 40px; background: #1e293b; border-radius: 6px; overflow-x: auto;"><code${langClass} id="${codeId}" style="color: #e2e8f0;">${codeContent}</code></pre>
</div>`;

  return { html, nextIndex: i + 1 };
}
