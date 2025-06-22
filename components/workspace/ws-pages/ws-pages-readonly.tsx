"use client";

import { BlockNoteViewRaw, useCreateBlockNote } from "@blocknote/react";
import { PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

export default function ClientReadOnlyBlockNote({
  content,
}: {
  content: PartialBlock[];
}) {
  const editor = useCreateBlockNote({ initialContent: content });
  if (!editor) return null;
  return (
    <BlockNoteViewRaw
      editor={editor}
      editable={false}
      theme="light"
      className="min-h-[60vh] w-full"
    />
  );
}
