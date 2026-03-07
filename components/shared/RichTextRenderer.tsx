import Link from 'next/link';
import type { BlockNode, InlineNode, ListBlock } from '@/lib/strapi-types';

function renderInline(node: InlineNode, i: number): React.ReactNode {
  if (node.type === 'link') {
    const isInternal = node.url.startsWith('/');
    if (isInternal) {
      return (
        <Link key={i} href={node.url} className="text-accent-purple hover:underline">
          {node.children.map((c, j) => renderInline(c, j))}
        </Link>
      );
    }
    return (
      <a key={i} href={node.url} className="text-accent-purple hover:underline" target="_blank" rel="noopener noreferrer">
        {node.children.map((c, j) => renderInline(c, j))}
      </a>
    );
  }

  // TextNode
  let content: React.ReactNode = node.text;
  if (node.bold) content = <strong className="text-white">{content}</strong>;
  if (node.italic) content = <em>{content}</em>;
  if (node.underline) content = <u>{content}</u>;
  if (node.strikethrough) content = <s>{content}</s>;
  if (node.code) content = <code className="bg-surface px-1.5 py-0.5 rounded text-sm">{content}</code>;

  return <span key={i}>{content}</span>;
}

function renderBlock(block: BlockNode, i: number): React.ReactNode {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={i} className="text-muted leading-relaxed mb-4">
          {block.children.map((c, j) => renderInline(c, j))}
        </p>
      );

    case 'heading': {
      const Tag = `h${block.level}` as keyof JSX.IntrinsicElements;
      const classes: Record<number, string> = {
        2: 'text-2xl font-bold mt-12 mb-4',
        3: 'text-xl font-semibold mt-8 mb-3',
        4: 'text-lg font-semibold mt-6 mb-2',
      };
      return (
        <Tag key={i} className={classes[block.level] || 'font-bold mb-2'}>
          {block.children.map((c, j) => renderInline(c, j))}
        </Tag>
      );
    }

    case 'list': {
      const items = (block as ListBlock).children.map((item, j) => (
        <li key={j}>{item.children.map((c, k) => renderInline(c, k))}</li>
      ));
      if (block.format === 'ordered') {
        return <ol key={i} className="list-decimal pl-6 space-y-2 text-muted mb-4">{items}</ol>;
      }
      return <ul key={i} className="list-disc pl-6 space-y-2 text-muted mb-4">{items}</ul>;
    }

    case 'quote':
      return (
        <blockquote key={i} className="border-l-4 border-accent-purple pl-4 italic text-muted my-6">
          {block.children.map((c, j) => renderInline(c, j))}
        </blockquote>
      );

    case 'image':
      return (
        <figure key={i} className="my-8">
          <img
            src={block.image.url}
            alt={block.image.alternativeText || ''}
            width={block.image.width}
            height={block.image.height}
            className="rounded-xl w-full"
          />
        </figure>
      );

    default:
      return null;
  }
}

export default function RichTextRenderer({ content }: { content: BlockNode[] }) {
  if (!content) return null;
  return <>{content.map((block, i) => renderBlock(block, i))}</>;
}
