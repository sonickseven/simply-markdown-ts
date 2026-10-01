import parseInline from './parseInLine.ts';

const ORDERED_PATTERN = /^(\s*)(\d+)\.\s+(.+)$/;
const UNORDERED_PATTERN = /^(\s*)([-*+])\s+(.+)$/;

// Matches "- [x] text" or "- [] text" (also accepts "* " and "+ ")
const CHECKBOX_PATTERN = /^\[([ xX]?)\]\s+(.*)$/;

export default function parseList(
  lines: string[],
  startIndex: number,
  ordered: boolean,
  baseIndent: number = -1,
): { html: string; nextIndex: number } {
  const listItems: string[] = [];
  let i = startIndex;

  while (i < lines.length) {
    const orderedMatch = lines[i].match(ORDERED_PATTERN);
    const unorderedMatch = lines[i].match(UNORDERED_PATTERN);
    const match = ordered ? orderedMatch : unorderedMatch;

    // Break if the line isn't a list item of the expected type
    if (!match) break;

    const indent = match[1].length;

    // Set the base indent for this list level on the first matched item
    if (baseIndent === -1) {
      baseIndent = indent;
    } else if (indent < baseIndent) {
      break;
    }

    const content = match[3];

    // Check inline nested marker (e.g. "- - Item")
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

    // ---- Checkbox detection ----
    let checkboxHtml = '';
    let displayContent = content;

    const checkboxMatch = content.match(CHECKBOX_PATTERN);
    if (checkboxMatch) {
      const isChecked = checkboxMatch[1].toLowerCase() === 'x';
      const isUnchecked = checkboxMatch[1] === '';
      // Only render a checkbox when we have `[x]` or `[]`
      if (isChecked || isUnchecked) {
        checkboxHtml = `<input type="checkbox" disabled${
          isChecked ? ' checked' : ''
        } class="md-checkbox"> `;
        displayContent = checkboxMatch[2];
      }
    }

    // Check for nested child lists on subsequent lines
    let nestedHtml = '';
    i++;

    if (i < lines.length) {
      const nextOrderedMatch = lines[i].match(ORDERED_PATTERN);
      const nextUnorderedMatch = lines[i].match(UNORDERED_PATTERN);
      const nextMatch = nextOrderedMatch || nextUnorderedMatch;

      if (nextMatch && nextMatch[1].length > baseIndent) {
        const nextIsOrdered = !!nextOrderedMatch;
        const nested = parseList(lines, i, nextIsOrdered, nextMatch[1].length);
        nestedHtml = `\n${nested.html}`;
        i = nested.nextIndex;
      }
    }

    listItems.push(
      `<li>${checkboxHtml}${parseInline(displayContent)}${nestedHtml}</li>`,
    );
  }

  const tag = ordered ? 'ol' : 'ul';
  const html = `<${tag}>\n${listItems.join('\n')}\n</${tag}>`;
  return { html, nextIndex: i };
}
