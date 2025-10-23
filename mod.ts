import parseCodeBlock from './src/parseCodeBlock.ts';
import parseInline from './src/parseInLine.ts';
import parseList from './src/parseList.ts';
import parseTable from './src/parseTable.ts';
import parseBlockquote from './src/parseBlockquote.ts';
import parseHeader from './src/parseHeader.ts';
import type { renderTypes } from './src/types.d.ts';
import clipBoard from './src/clipBoardJs.ts';

/**
 * Converts Markdown text to HTML string
 * @param markdown - The markdown text to convert
 * @returns HTML string representation of the markdown
 */

export { default as CSS } from './src/css.ts';
export { default as clipBoard } from './src/clipBoardJs.ts';

export function render(markdown: string, options?: renderTypes): string {
  if (!markdown) return '';

  // to future
  options;

  const lines = markdown.split('\n');
  const html: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Code blocks (``` or ~~~)
    if (line.trim().startsWith('```') || line.trim().startsWith('~~~')) {
      const result = parseCodeBlock(lines, i);
      html.push(result.html);
      i = result.nextIndex;
      continue;
    }

    // Headers (# ## ### etc)
    if (line.match(/^#{1,6}\s+/)) {
      html.push(parseHeader(line));
      i++;
      continue;
    }

    // Horizontal rule (---, ***, ___)
    if (line.match(/^(\*\*\*|---|___)$/)) {
      html.push('<hr>');
      i++;
      continue;
    }

    // Blockquote (> text)
    if (line.match(/^>\s+/)) {
      const result = parseBlockquote(lines, i);
      html.push(result.html);
      i = result.nextIndex;
      continue;
    }

    // Tables
    if (i + 1 < lines.length && lines[i + 1].match(/^\|?[\s:-]+\|/)) {
      const result = parseTable(lines, i);
      if (result) {
        html.push(result.html);
        i = result.nextIndex;
        continue;
      }
    }

    // Unordered lists (-, *, +)
    if (line.match(/^[\s]*[-*+]\s+/)) {
      const result = parseList(lines, i, false);
      html.push(result.html);
      i = result.nextIndex;
      continue;
    }

    // Ordered lists (1., 2., etc)
    if (line.match(/^[\s]*\d+\.\s+/)) {
      const result = parseList(lines, i, true);
      html.push(result.html);
      i = result.nextIndex;
      continue;
    }

    // Paragraph
    html.push(`<p>${parseInline(line)}</p>`);
    i++;
  }

  return `<div class="markdown-body"><script>${clipBoard}</script>` + html.join('\n') + `</div>`;
}
