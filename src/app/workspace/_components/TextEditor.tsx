import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import EditorExtensions from "./EditorExtensions";
type Props = {};

const TextEditor = (props: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start taking your notes here…",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "focus:outline-none h-screen p-4",
      },
    },
  });
  return (
    <div>
      <EditorExtensions editor={editor} /> 
      <div>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TextEditor;
