import { Fragment } from 'react';

/**
 * Minimal inline markup so copy stays translatable as whole sentences while
 * still carrying emphasis and links:
 *
 *   **bold**      → <strong>
 *   *italic*      → <em>  (coloured with `accent` when one is supplied)
 *   [text](url)   → <a>
 *
 * Deliberately not a general markdown parser — no nesting, no blocks. Every
 * construct here appears in the source copy, and anything a translator gets
 * wrong degrades to plain text rather than throwing.
 */
const TOKEN = /(\*\*[^*]+\*\*|\*[^*\n]+\*|\[[^\]]+\]\([^)\s]+\))/g;

export function Rich({
  children,
  accent,
}: {
  children: string;
  /** Colour for *italic* runs. Statement headings use the chapter accent. */
  accent?: string;
}) {
  if (!children) return null;
  const parts = children.split(TOKEN);
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        const key = `${i}-${part.slice(0, 12)}`;

        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
          return <strong key={key}>{part.slice(2, -2)}</strong>;
        }

        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
          return (
            <em key={key} style={accent ? { fontStyle: 'italic', color: accent } : undefined}>
              {part.slice(1, -1)}
            </em>
          );
        }

        if (part.startsWith('[')) {
          const at = part.indexOf('](');
          if (at > 0) {
            const label = part.slice(1, at);
            const href = part.slice(at + 2, -1);
            return (
              <a key={key} href={href} target="_blank" rel="noopener">
                {label}
              </a>
            );
          }
        }

        return <Fragment key={key}>{part}</Fragment>;
      })}
    </>
  );
}
