import parseInline from './parseInLine.ts';

/**
 * Convert heading text to URL-friendly slug
 */
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Normalize unicode characters
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Parse headers (h1-h6) with anchor link icons
 */
export default function parseHeader(line: string, disableUrlIndex?: true): string {
  const match = line.match(/^(#{1,6})\s+(.+)$/);
  if (!match) return '';

  const level = match[1].length;
  const rawText = match[2];
  const content = parseInline(rawText);

  const slug = createSlug(rawText);

  if (disableUrlIndex){
    return `<h${level} id="${slug}">${content}</h${level}>`;
  }

  // Create slug from raw text (before HTML conversion)

  // SVG link icon
  const linkIcon =
    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 8px; opacity: 0.6; transition: opacity 0.2s;">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>`;

  return `<h${level} id="${slug}" style="position: relative; display: flex; align-items: center;">
    <a href="#${slug}" class="header-anchor" style="text-decoration: none; color: inherit; display: flex; align-items: center;">
      ${linkIcon}
    </a>
    <span>${content}</span>
  </h${level}>`;
}