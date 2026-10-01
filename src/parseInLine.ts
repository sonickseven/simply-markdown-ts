import escapeHtml from './escapeHTML.ts';

export default function parseInline(text: string): string {
  let result = text;

  // Images
  result = result.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

  // Links
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Inline code
  result = result.replace(/`([^`]+)`/g, (_, code) => `<code>${escapeHtml(code)}</code>`);

  // Bold + italic
  result = result.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  result = result.replace(/___(.+?)___/g, '<strong><em>$1</em></strong>');

  // Bold **text** or __text__
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // ⚠️ For __bold__, require boundaries so AREA_ha doesn't trigger it
  result = result.replace(
    /(^|[\s.,;:!?(])__([^_\n]+?)__(?=[\s.,;:!?)]|$)/g,
    '$1<strong>$2</strong>',
  );

  // Italic *text*
  result = result.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Italic _text_ — ⚠️ REQUIRES boundaries so AREA_ha is safe
  result = result.replace(/(^|[\s.,;:!?(])_([^_\n]+?)_(?=[\s.,;:!?)]|$)/g, '$1<em>$2</em>');

  // Strikethrough
  result = result.replace(/~~(.+?)~~/g, '<del>$1</del>');

  // Line breaks
  result = result.replace(/ {2}$/g, '<br>');

  return result;
}
