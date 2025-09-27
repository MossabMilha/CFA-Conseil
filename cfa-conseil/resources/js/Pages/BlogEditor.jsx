import React, { useEffect, useRef, useState } from 'react';
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { EditorContent } from "@tiptap/react";
import Dropdown from "@/Components/Dropdown";
import { Bold, Italic, Heading, List, ListOrdered, Image as ImageIcon, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Palette, Baseline, ImagePlus, Images } from "lucide-react";

import "@/../css/tiptap/editor-content.css";

// Utility: generate unique ID for each image 
const generateId = () => Math.random().toString(36).substring(2, 15) + Date.now().toString(36);

export default function BlogEditor() {

  const fileInputRef = useRef(null);
  const imagesRef = useRef(new Map());
  const [tempImageFiles, setTempImageFiles] = useState([]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1,2,3,4,5,6] } }),
      Image.extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            "data-temp-id": {
              default: null,
              parseHTML: element => element.getAttribute("data-temp-id"),
              renderHTML: attributes => {
                if (!attributes["data-temp-id"]) return {};
                return { "data-temp-id": attributes["data-temp-id"] };
              },
            },
          };
        },
      }),
      TextStyle,
      Color.configure({ types: ['textStyle'] }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: "<p>Start writing your blog here...</p>",
    editorProps: { 
      attributes: { 
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none' 
      } 
    },
    onUpdate: ({ editor }) => {
      
      const currentImageIds = new Set();
      editor.state.doc.descendants((node) => {
        if (node.type.name === "image" && node.attrs["data-temp-id"]) {
          currentImageIds.add(node.attrs["data-temp-id"]);
        }
      });

      const usedBlobUrls = new Set();
      
      for (const [id, { blobUrl }] of imagesRef.current.entries()) {
        if (!currentImageIds.has(id) && blobUrl) {
          URL.revokeObjectURL(blobUrl);
          imagesRef.current.delete(id);
        } else if (blobUrl) {
          usedBlobUrls.add(blobUrl);
        }
      }

      setTempImageFiles(Array.from(imagesRef.current.values()).map((i) => i.file));
    },
  });

  if (!editor) return null;

  // Cleanup temp images on unmount
  useEffect(() => {
    return () => {
      // Clean up blob URLs
      imagesRef.current.forEach(({ blobUrl }) => {
        if (blobUrl) URL.revokeObjectURL(blobUrl);
      });
      imagesRef.current.clear();
    };
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;


    const imageId = generateId();
    const blobUrl = URL.createObjectURL(file);
    
    // Store reference with both blob URL and data URL
    imagesRef.current.set(imageId, {file, blobUrl});
    
    setTempImageFiles(prev => [...prev, file]);
    
    // Use data URL in the editor instead of blob URL
    editor.chain().focus().setImage({ 
      src: blobUrl, 
      'data-temp-id': imageId 
    }).run();
    
    
    event.target.value = '';
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  console.log("imagesRef.current.values() ", imagesRef.current.values());
  console.log("tempImageFiles ", tempImageFiles);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-4 p-2 bg-gray-50 rounded-md border border-gray-200">
        <button 
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
          title="Bold"
        >
          <Bold />
        </button>

        <button 
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
          title="Italic"
        >
          <Italic />
        </button>

        <Dropdown className="hover:bg-gray-200 rounded cursor-pointer">
          <Dropdown.Trigger>
            <div className="flex items-center px-2"><Heading /></div>
          </Dropdown.Trigger>
          <Dropdown.Content width="min-w-64">
            <button 
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`flex items-center gap-2 w-full p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
              title="Heading 1"
            > 
              <Heading1/> 
              <span className="whitespace-nowrap">Heading 1</span> 
            </button>
            <button 
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`flex items-center gap-2 w-full p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
              title="Heading 2"
            > 
              <Heading2 /> 
              <span className="whitespace-nowrap">Heading 2</span> 
            </button>
            <button 
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`flex items-center gap-2 w-full p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}`}
              title="Heading 3"
            > 
              <Heading3 /> 
              <span className="whitespace-nowrap">Heading 3</span> 
            </button>
            <button 
              onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
              className={`flex items-center gap-2 w-full p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 4 }) ? 'bg-gray-200' : ''}`}
              title="Heading 4"
            > 
              <Heading4 /> 
              <span className="whitespace-nowrap">Heading 4</span> 
            </button>
            <button 
              onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
              className={`flex items-center gap-2 w-full p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 5 }) ? 'bg-gray-200' : ''}`}
              title="Heading 5"
            > 
              <Heading5 /> 
              <span className="whitespace-nowrap">Heading 5</span> 
            </button>
            <button 
              onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
              className={`flex items-center gap-2 w-full p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 6 }) ? 'bg-gray-200' : ''}`}
              title="Heading 6"
            > 
              <Heading6 /> 
              <span className="whitespace-nowrap">Heading 6</span> 
            </button>
          </Dropdown.Content>
        </Dropdown>

        <button 
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
          title="Bullet List"
        >
          <List />
        </button>

        <button 
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
          title="Numbered List"
        >
          <ListOrdered />
        </button>

        {/* Color Picker */}
        <Dropdown className="hover:bg-gray-200 rounded cursor-pointer">
          <Dropdown.Trigger>
            <div className="flex items-center px-2">
                <Baseline />
            </div>
          </Dropdown.Trigger>
          <Dropdown.Content >
            <div className="p-2">
              <div className="grid grid-cols-5 ">
                {[
                  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
                  '#FFFF00', '#00FFFF', '#FF00FF', '#C0C0C0', '#808080',
                  '#800000', '#808000', '#008000', '#800080', '#008080',
                  '#000080', '#FFA500', '#A52A2A', '#FFC0CB', '#FFD700'
                ].map((color) => (
                  <button
                    key={color}
                    onClick={() => editor.chain().focus().setColor(color).run()}
                    className="h-8 border border-gray-300 hover:border-blue-500 "
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200">
                <button
                  onClick={() => editor.chain().focus().unsetColor().run()}
                  className="w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  Reset color
                </button>
              </div>
            </div>
          </Dropdown.Content>
        </Dropdown>

        <Dropdown>
          <Dropdown.Trigger>
            <div className="flex items-center px-2">
                <ImageIcon />
            </div>
          </Dropdown.Trigger>
          <Dropdown.Content width="min-w-48">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button 
              type="button"
              onClick={triggerFileInput}
              className="p-2 rounded hover:bg-gray-200 flex items-center gap-2"
              title="Insert Image"
            >
              <ImagePlus /><span className="whitespace-nowrap">Insert Image</span>
            </button>
            <button 
              type="button"
              className="p-2 rounded hover:bg-gray-200 flex items-center gap-2"
              title="Insert Image"
            >
              <Images /><span className="whitespace-nowrap">Your Images</span>
            </button>
          </Dropdown.Content>
        </Dropdown>

        <div className="relative">
          
        </div>
      </div>

      {/* Editor */}
      <div className="max-w-none">
        <EditorContent 
          editor={editor} 
          className="editor-content min-h-[300px] p-4 border border-gray-300 rounded-md prose focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:focus:outline-none [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
        />
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => {
            console.log(editor.getHTML());
            alert("Blog saved! Check console for HTML output.");
          }}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Save Blog
        </button>
      </div>
    </div>
  );
};
