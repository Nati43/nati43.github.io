import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Configure marked renderer for inline markdown
const renderer = new marked.Renderer();

// Open external links securely in a new tab
renderer.link = (href, title, text) => {
  const cleanHref = href || '';
  const titleAttr = title ? ` title="${title}"` : '';
  return `<a href="${cleanHref}" target="_blank" rel="noopener noreferrer"${titleAttr}>${text}</a>`;
};

marked.setOptions({
  gfm: true,
  breaks: true,
  renderer
});

/**
 * Safely parses and sanitizes inline markdown text.
 * Supports:
 * - Bold: **text** or __text__
 * - Italic: *text* or _text_
 * - Underline: <u>text</u> or ++text++
 * - Strikethrough: ~~text~~
 * - Inline Code: `code`
 * - Links: [label](url)
 * 
 * @param {string} text - Raw markdown line
 * @returns {string} Sanitized HTML safe for v-html
 */
export function renderInlineMarkdown(text) {
  if (!text || typeof text !== 'string') return '';

  // Preprocess shorthand ++underlined++ to <u>underlined</u>
  const preprocessed = text.replace(/\+\+([^+]+)\+\+/g, '<u>$1</u>');

  // Parse inline (does not wrap in <p> tag)
  const rawHtml = marked.parseInline(preprocessed);

  // Sanitize with DOMPurify to guarantee zero XSS vulnerability
  return DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      'strong',
      'b',
      'em',
      'i',
      'u',
      'ins',
      's',
      'del',
      'code',
      'a',
      'span',
      'br'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'title', 'class']
  });
}

/**
 * Safely parses and sanitizes full block markdown text (paragraphs, lists, headings, code blocks, etc.).
 * Fully backward-compatible: accepts a markdown string or an array of strings.
 * 
 * @param {string|string[]} content - Raw markdown block or legacy array of points
 * @returns {string} Sanitized HTML safe for v-html
 */
export function renderBlockMarkdown(content) {
  if (!content) return '';

  let markdownString = '';
  if (Array.isArray(content)) {
    // Convert legacy array of points to markdown bullet list
    markdownString = content.map(p => `- ${p}`).join('\n');
  } else if (typeof content === 'string') {
    markdownString = content;
  } else {
    return '';
  }

  // Preprocess shorthand ++underlined++ to <u>underlined</u>
  const preprocessed = markdownString.replace(/\+\+([^+]+)\+\+/g, '<u>$1</u>');

  // Full block parse
  const rawHtml = marked.parse(preprocessed);

  // Sanitize with DOMPurify allowing standard semantic block & inline tags
  return DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      'p',
      'ul',
      'ol',
      'li',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'pre',
      'code',
      'strong',
      'b',
      'em',
      'i',
      'u',
      'ins',
      's',
      'del',
      'a',
      'span',
      'br',
      'hr'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'title', 'class']
  });
}

