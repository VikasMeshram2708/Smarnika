"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect, useState, useCallback } from "react";
import { addPage } from "@/app/dal/page-action";
import {
  optimizeJsonStringify,
  compressContent,
  getContentSize,
} from "@/utils/content-optimizer";
import { logContentSize } from "@/components/ui/performance-monitor";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

/**
 * Helper that guarantees we always pass a string to `toast.*`.
 * If the backend returns an object (e.g. zod validation errors),
 * we stringify it to avoid the TS2345 error.
 */
function toString(msg: unknown): string {
  return typeof msg === "string" ? msg : JSON.stringify(msg);
}

interface WsEditorProps {
  handleOpenChange: (toggleState: boolean) => void;
  initialTitle?: string;
  initialContent?: any;
  onSave?: (data: { title: string; content: string }) => Promise<any>;
}

export default function WsEditor({
  handleOpenChange,
  initialTitle = "Untitled",
  initialContent,
  onSave,
}: WsEditorProps) {
  const editor = useCreateBlockNote(
    initialContent ? { initialContent } : undefined
  );

  const [title, setTitle] = useState(initialTitle);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Mark the document as dirty whenever the content changes.
  useEffect(() => {
    if (!editor) return;
    const off = editor.onChange(() => setHasChanges(true));
    return () => off?.();
  }, [editor]);

  const handleSave = useCallback(async () => {
    if (!editor || isSaving) return;

    setIsSaving(true);
    const startTime = performance.now();

    try {
      // Optimize content serialization
      const jsonContent = optimizeJsonStringify(editor.document);
      const compressedContent = compressContent(jsonContent);

      // Log content size for monitoring
      const contentSize = getContentSize(compressedContent);
      console.log(`Saving content with size: ${contentSize}`);

      const payload = {
        title: title.trim() || "Untitled",
        content: compressedContent,
      };

      let res;
      if (onSave) {
        res = await onSave(payload);
      } else {
        // Default: create new page
        res = await addPage(payload);
      }

      const endTime = performance.now();
      const loadTime = endTime - startTime;

      // Log performance metrics
      logContentSize(contentSize, loadTime);

      if (!res?.success) {
        toast.error(toString(res?.message ?? "Failed to save"));
        return;
      }

      toast.success(toString(res?.message ?? "Saved"));
      setHasChanges(false);
      handleOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  }, [editor, isSaving, title, handleOpenChange, onSave]);

  if (!editor) return null;

  return (
    <div className="space-y-4">
      {/* Title input & Save button */}
      <div className="flex items-center gap-2">
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setHasChanges(true);
          }}
          type="text"
          placeholder="Untitled"
          className="flex-1 border-0 text-2xl font-bold text-muted-foreground shadow-none outline-none"
        />
        <Button
          onClick={handleSave}
          disabled={isSaving || !hasChanges}
          className="shrink-0"
        >
          {isSaving ? "Saving…" : hasChanges ? "Save" : "Saved"}
        </Button>
      </div>

      {/* Editor */}
      <BlockNoteView
        editor={editor}
        theme="light"
        className="min-h-[70svh] h-full w-full"
      />
    </div>
  );
}
