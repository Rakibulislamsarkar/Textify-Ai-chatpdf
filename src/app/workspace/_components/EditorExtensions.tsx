import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
} from "lucide-react";

import React from "react";

type Props = { editor: any };

const EditorExtensions = ({ editor }: Props) => {
  return (
    editor && (
      <div className="p-5">
        <div className="control-group">
          <div className="button-group flex gap-2">
            <button
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className={editor?.isActive("bold") ? "text-slate-500" : ""}
            >
              <BoldIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "text-slate-500" : ""}
            >
              <ItalicIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive("underline") ? "is-active" : ""}
            >
              <UnderlineIcon className="w-4 h-4" />
            </button>

            
          </div>
        </div>
      </div>
    )
  );
};

export default EditorExtensions;
