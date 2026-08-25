import parseInline from './parseInLine.ts';

export default function parseList(
  lines: string[],
  startIndex: number,
  ordered: boolean,
): { html: string; nextIndex: number } {
  const listItems: string[] = [];
  let i = startIndex;
  // Fixed: Changed regex for ordered lists to handle numbers correctly
  const listPattern = ordered
    ? /^(\s*)(\d+)\.\s+(.+)$/ // Added group for number
    : /^(\s*)([-*+])\s+(.+)$/;

  while (i < lines.length) {
    const match = lines[i].match(listPattern);
    if (!match) break;

    const indent = match[1].length;
    const content = ordered ? match[3] : match[3]; // Adjusted group access

    // Check if content starts with another list marker
    const nestedMarkerMatch = content.match(/^([-*+])\s+(.+)$/);
    if (nestedMarkerMatch) {
      const nestedContent = nestedMarkerMatch[2];
      const prefix = content.substring(0, content.indexOf(nestedMarkerMatch[1]));
      listItems.push(
        `<li>${parseInline(prefix)}<ul>\n<li>${parseInline(nestedContent)}</li>\n</ul></li>`,
      );
      i++;
      continue;
    }

    // Check for nested lists with indentation
    if (i + 1 < lines.length) {
      const nextMatch = lines[i + 1].match(listPattern);
      if (nextMatch && nextMatch[1].length > indent) {
        const nested = parseList(lines, i + 1, ordered);
        listItems.push(`<li>${parseInline(content)}${nested.html}</li>`);
        i = nested.nextIndex;
        continue;
      }
    }

    listItems.push(`<li>${parseInline(content)}</li>`);
    i++;
  }

  const tag = ordered ? 'ol' : 'ul';
  const html = `<${tag}>\n${listItems.join('\n')}\n</${tag}>`;
  return { html, nextIndex: i };
}
