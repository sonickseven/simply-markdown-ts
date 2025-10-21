import parseInline from './parseInLine.ts';

/**
 * Parse lists (ordered and unordered)
 */
export default function parseList(
  lines: string[],
  startIndex: number,
  ordered: boolean,
): { html: string; nextIndex: number } {
  const listItems: string[] = [];
  let i = startIndex;
  const listPattern = ordered ? /^(\s*)\d+\.\s+(.+)$/ : /^(\s*)([-*+])\s+(.+)$/;

  while (i < lines.length) {
    const match = lines[i].match(listPattern);
    if (!match) break;

    const indent = match[1].length;
    const content = ordered ? match[2] : match[3];

    // Check if content starts with another list marker (e.g., "- - Item" or "- * Item")
    const nestedMarkerMatch = content.match(/^([-*+])\s+(.+)$/);
    if (nestedMarkerMatch) {
      // Content has a list marker, treat it as nested
      const nestedContent = nestedMarkerMatch[2];
      listItems.push(
        `<li>${parseInline(content.substring(0, content.indexOf(nestedMarkerMatch[1])))}<ul>\n<li>${
          parseInline(nestedContent)
        }</li>\n</ul></li>`,
      );
      i++;
      continue;
    }

    // Check for nested lists with indentation
    if (i + 1 < lines.length) {
      const nextMatch = lines[i + 1].match(listPattern);
      if (nextMatch && nextMatch[1].length > indent) {
        // Has nested list with proper indentation
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
