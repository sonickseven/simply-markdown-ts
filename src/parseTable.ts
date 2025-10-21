import parseInline from './parseInLine.ts';

/**
 * Parse tables
 */
export default function parseTable(
  lines: string[],
  startIndex: number,
): { html: string; nextIndex: number } | null {
  const headerLine = lines[startIndex];
  const separatorLine = lines[startIndex + 1];

  if (!headerLine.includes('|') || !separatorLine.match(/^\|?[\s:-]+\|/)) {
    return null;
  }

  const headers = headerLine.split('|').map((h) => h.trim()).filter((h) => h);
  const headerHtml = headers.map((h) => `<th>${parseInline(h)}</th>`).join('');

  let i = startIndex + 2;
  const rows: string[] = [];

  while (i < lines.length && lines[i].includes('|')) {
    const cells = lines[i].split('|').map((c) => c.trim()).filter((c) => c);
    const rowHtml = cells.map((c) => `<td>${parseInline(c)}</td>`).join('');
    rows.push(`<tr>${rowHtml}</tr>`);
    i++;
  }

  const html = `<table>\n<thead>\n<tr>${headerHtml}</tr>\n</thead>\n<tbody>\n${
    rows.join('\n')
  }\n</tbody>\n</table>`;
  return { html, nextIndex: i };
}
