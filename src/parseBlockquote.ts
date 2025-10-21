import parseInline from './parseInLine.ts';

/**
 * Parse blockquotes
 */
export default function parseBlockquote(
  lines: string[],
  startIndex: number,
): { html: string; nextIndex: number } {
  const quoteLines: string[] = [];
  let i = startIndex;

  while (i < lines.length && lines[i].match(/^>\s*/)) {
    const content = lines[i].replace(/^>\s*/, '');
    quoteLines.push(parseInline(content));
    i++;
  }

  const html = `<blockquote>${quoteLines.join('<br>')}</blockquote>`;
  return { html, nextIndex: i };
}
