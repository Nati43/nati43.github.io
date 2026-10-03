import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

const renderer = {
  link({ href, title, text }) {
    const cleanHref = href || '';
    const titleAttr = title ? ` title="${title}"` : '';
    return `<a href="${cleanHref}" target="_blank" rel="noopener noreferrer"${titleAttr}>${text}</a>`;
  }
};

marked.use({
  gfm: true,
  breaks: true,
  renderer
});

export function renderInlineMarkdown(text) {
  if (!text || typeof text !== 'string') return '';

  const preprocessed = text.replace(/\+\+([^+]+)\+\+/g, '<u>$1</u>');
  const rawHtml = marked.parseInline(preprocessed);

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

export function renderBlockMarkdown(content) {
  if (!content) return '';

  let markdownString = '';
  if (Array.isArray(content)) {
    markdownString = content.map(p => `- ${p}`).join('\n');
  } else if (typeof content === 'string') {
    markdownString = content;
  } else {
    return '';
  }

  const preprocessed = markdownString.replace(/\+\+([^+]+)\+\+/g, '<u>$1</u>');
  const rawHtml = marked.parse(preprocessed);

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
