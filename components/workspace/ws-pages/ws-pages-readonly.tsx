"use client";

import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { PartialBlock } from "@blocknote/core";
import { useEffect } from "react";
import { logContentSize } from "@/components/ui/performance-monitor";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

export default function ClientReadOnlyBlockNote({
  content,
}: {
  content: PartialBlock[];
}) {
  const editor = useCreateBlockNote({ initialContent: content });

  useEffect(() => {
    if (editor && content.length > 0) {
      // Log content size for performance monitoring
      const contentSize = JSON.stringify(content).length;
      const sizeKB = (contentSize / 1024).toFixed(2);
      logContentSize(`${sizeKB}KB`, 0);
    }
  }, [editor, content]);

  if (!editor) return null;
  return (
    <BlockNoteView
      editor={editor}
      editable={false}
      theme="light"
      className="min-h-[60vh] w-full"
    />
  );
}
