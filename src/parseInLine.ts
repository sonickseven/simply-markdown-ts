import escapeHtml from './escapeHTML.ts';

export default function parseInline(text: string): string {
  let result = text;

  // Images
  result = result.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

  // Links
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Inline code
  result = result.replace(/\b`([^`]+)`\b/g, (_, code) => `<code>${escapeHtml(code)}</code>`);

  // Bold and italic
  result = result.replace(/\b\*\*\*(.+?)\*\*\*\b/g, '<strong><em>$1</em></strong>');
  result = result.replace(/\b___(.+?)___\b/g, '<strong><em>$1</em></strong>');

  // Bold
  result = result.replace(/\b\*\*(.+?)\*\*\b/g, '<strong>$1</strong>');
  result = result.replace(/\b__(.+?)__\b/g, '<strong>$1</strong>');

  // Italic
  result = result.replace(/\b\*(.+?)\*\b/g, '<em>$1</em>');
  result = result.replace(/\b_(.+?)_\b/g, '<em>$1</em>');

  // Strikethrough
  result = result.replace(/\b~(.+?)~\b/g, '<del>$1</del>');

  // Line breaks
  result = result.replace(/\s\s$/g, '<br>');

  return result;
}
