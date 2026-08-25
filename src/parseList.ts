import parseInline from './parseInLine.ts';

const ORDERED_PATTERN = /^(\s*)(\d+)\.\s+(.+)$/;
const UNORDERED_PATTERN = /^(\s*)([-*+])\s+(.+)$/;

export default function parseList(
  lines: string[],
  startIndex: number,
  ordered: boolean,
): { html: string; nextIndex: number } {
  const listItems: string[] = [];
  let i = startIndex;
  const listPattern = ordered ? ORDERED_PATTERN : UNORDERED_PATTERN;

  while (i < lines.length) {
    const match = lines[i].match(listPattern);
    if (!match) break;

    const indent = match[1].length;
    const content = match[3];

    // Check if content starts with another list marker (inline nested marker, e.g. "- - Item")
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

    // Check for nested lists with indentation — try BOTH patterns,
    // since a nested list can be a different type (e.g. ordered > unordered)
    if (i + 1 < lines.length) {
      const nextOrderedMatch = lines[i + 1].match(ORDERED_PATTERN);
      const nextUnorderedMatch = lines[i + 1].match(UNORDERED_PATTERN);
      const nextMatch = nextOrderedMatch || nextUnorderedMatch;
      const nextIsOrdered = !!nextOrderedMatch;

      if (nextMatch && nextMatch[1].length > indent) {
        const nested = parseList(lines, i + 1, nextIsOrdered);
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
