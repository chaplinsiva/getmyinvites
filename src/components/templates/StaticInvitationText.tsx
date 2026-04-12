"use client";

/** Renders saved text nodes from invitation JSON (positions preserved). */
export function StaticInvitationText({ node, className, style = {} }: { node?: { text?: string; x?: number; y?: number }; className?: string; style?: React.CSSProperties }) {
  if (!node) return null;
  return (
    <div
      className={className}
      style={{
        transform: `translate(${node.x ?? 0}px, ${node.y ?? 0}px)`,
        whiteSpace: "pre-wrap",
        ...style,
      }}
    >
      {node.text}
    </div>
  );
}
