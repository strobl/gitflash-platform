
import React from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { Bold, Italic, Underline as UnderlineIcon, AlignLeft, AlignCenter, AlignRight, List, ListOrdered } from 'lucide-react';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-[color:var(--dark-dark\_6,#E7E9EC)] bg-white min-h-[109px] w-full rounded-lg border-solid overflow-hidden">
      <div className="flex items-center border-b border-[#E7E9EC] p-2 gap-1">
        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1 mr-1 hover:bg-gray-100 rounded ${editor.isActive('bold') ? 'bg-gray-100' : ''}`}
        >
          <Bold className="h-4 w-4 text-[#546679]" />
        </button>
        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1 mr-1 hover:bg-gray-100 rounded ${editor.isActive('italic') ? 'bg-gray-100' : ''}`}
        >
          <Italic className="h-4 w-4 text-[#546679]" />
        </button>
        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-1 mr-1 hover:bg-gray-100 rounded ${editor.isActive('underline') ? 'bg-gray-100' : ''}`}
        >
          <UnderlineIcon className="h-4 w-4 text-[#546679]" />
        </button>
        
        <div className="h-6 w-px bg-[#E7E9EC] mx-1"></div>
        
        <button 
          type="button" 
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-1 mr-1 hover:bg-gray-100 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-100' : ''}`}
        >
          <AlignLeft className="h-4 w-4 text-[#546679]" />
        </button>
        <button 
          type="button" 
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-1 mr-1 hover:bg-gray-100 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-100' : ''}`}
        >
          <AlignCenter className="h-4 w-4 text-[#546679]" />
        </button>
        <button 
          type="button" 
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-1 mr-1 hover:bg-gray-100 rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-100' : ''}`}
        >
          <AlignRight className="h-4 w-4 text-[#546679]" />
        </button>
        
        <div className="h-6 w-px bg-[#E7E9EC] mx-1"></div>
        
        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1 mr-1 hover:bg-gray-100 rounded ${editor.isActive('bulletList') ? 'bg-gray-100' : ''}`}
        >
          <List className="h-4 w-4 text-[#546679]" />
        </button>
        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1 mr-1 hover:bg-gray-100 rounded ${editor.isActive('orderedList') ? 'bg-gray-100' : ''}`}
        >
          <ListOrdered className="h-4 w-4 text-[#546679]" />
        </button>
      </div>
      
      <EditorContent 
        editor={editor} 
        className="p-3 min-h-[80px] outline-none text-[10px] text-[#546679]" 
      />
      
      <style>
        {`
          .ProseMirror:focus {
            outline: none;
            box-shadow: none;
          }
          
          .ProseMirror {
            outline: none;
          }
          
          /* Remove any blue borders from content editable */
          [contenteditable] {
            outline: none;
            border: none;
          }
          
          [contenteditable]:focus {
            outline: none;
            border: none;
            box-shadow: none;
          }
        `}
      </style>
    </div>
  );
};

export default TiptapEditor;
