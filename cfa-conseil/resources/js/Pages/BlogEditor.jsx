import React, { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from "@tiptap/react";
import { useForm } from '@inertiajs/react';
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Underline } from "@tiptap/extension-underline";
import { Color } from '@tiptap/extension-color';
import Dropdown from "@/Components/Dropdown";
import {
    Bold, Italic, List, ListOrdered, Heading,
    Heading1, Heading2, Heading3, Heading4, Heading5, Heading6,
    Baseline, ImagePlus, X, ArrowLeft, Underline as UnderlineIcon
} from "lucide-react";

import "@/../css/tiptap/editor-content.css";

// --------------------
// Utility: generate unique ID for each image
// --------------------
const generateId = () =>
    Math.random().toString(36).substring(2, 15) + Date.now().toString(36);

export default function BlogEditor({ blog: initialBlog = null }) {
    const isEditMode = !!initialBlog;
    // --------------------
    // Refs & State
    // --------------------
    const fileInputRef = useRef(null);
    const featuredImageRef = useRef(null);
    const imagesRef = useRef(new Map());
    const [featuredImage, setFeaturedImage] = useState(initialBlog?.featured_image || null);

    // Inertia form state
    const { data, setData, reset } = useForm({
        id: initialBlog?.id || null,
        title: initialBlog?.title || '',
        slug: initialBlog?.slug || '',
        content_html: initialBlog?.content_html || '',
        featured_image: initialBlog?.featured_image || null,
        images: initialBlog?.images || [],
        excerpt: initialBlog?.excerpt || ''
    });

    // --------------------
    // Editor setup
    // --------------------
    const editor = useEditor({
        extensions: [
            StarterKit.configure({ 
                heading: { levels: [1, 2, 3, 4, 5, 6] },
                // Disable the default underline extension since we're adding it separately
                underline: false
            }),
            Image.extend({
                addAttributes() {
                    return {
                        ...this.parent?.(),
                        "data-temp-id": {
                            default: null,
                            parseHTML: el => el.getAttribute("data-temp-id"),
                            renderHTML: attrs => attrs["data-temp-id"]
                                ? { "data-temp-id": attrs["data-temp-id"] }
                                : {},
                        },
                    };
                },
            }),
            TextStyle,
            Color.configure({ types: ['textStyle'] }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Underline,
        ],
        content: initialBlog?.content_html || "<p>Start writing your blog here...</p>",
        editorProps: {
            attributes: {
                class:
                    'prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none',
            },
        },
        onUpdate: ({ editor }) => syncImages(editor),
});

    if (!editor) return null;

    // Initialize editor with existing content and images
    useEffect(() => {
        if (initialBlog) {
            // Set featured image if exists
            if (initialBlog.featured_image) {
                setFeaturedImage(initialBlog.featured_image);
            }
        }

        // Cleanup on unmount
        return () => {
            imagesRef.current.forEach(({ blobUrl }) => blobUrl && URL.revokeObjectURL(blobUrl));
            imagesRef.current.clear();
        };
    }, [initialBlog]);

    // Handle editor initialization
    useEffect(() => {
        if (editor && initialBlog?.content_html) {
            editor.commands.setContent(initialBlog.content_html);
        }
    }, [editor, initialBlog?.content_html]);

    // --------------------
    // Functions
    // --------------------

    // Keep editor images in sync with imagesRef (remove unused blobs)
    const syncImages = (editor) => {
        const currentIds = new Set();
        editor.state.doc.descendants((node) => {
            if (node.type.name === "image" && node.attrs["data-temp-id"]) {
                currentIds.add(node.attrs["data-temp-id"]);
                console.log(node.attrs["data-temp-id"]);
            }
        });

        for (const [id, { blobUrl }] of imagesRef.current.entries()) {
            if (!currentIds.has(id) && blobUrl) {
                URL.revokeObjectURL(blobUrl);
                imagesRef.current.delete(id);
            }
        }
    };

    // Handle inserting image into editor
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', file);

            // Upload immediately to backend
            const res = await axios.post('/api/upload-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const realUrl = res.data.url;

            // Insert image directly with real URL
            editor.chain().focus().setImage({ src: realUrl }).run();

        } catch (err) {
            console.error('Image upload failed:', err);
            alert('Failed to upload image');
        }

        e.target.value = ''; // reset input
    };

    const handleFeaturedImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate
        if (!file.type.startsWith("image/")) {
            alert("Please select an image file");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert("Featured image must be less than 5MB");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', file);

            const res = await axios.post('/api/upload-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const realUrl = res.data.url;

            // Save real URL directly for preview and submission
            setData('featured_image', file);
            setFeaturedImage(realUrl); // optional: to show real URL preview

        } catch (err) {
            console.error('Featured image upload failed:', err);
            alert('Failed to upload featured image');
        }

        e.target.value = '';
    };



    // Trigger hidden file input
    const triggerFileInput = () => fileInputRef.current?.click();
    const triggerFeaturedImageInput = () => featuredImageRef.current?.click();

    // Handle blog submit
    const handleBlogUpload = async () => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content_html', editor.getHTML());
        formData.append('excerpt', data.excerpt);
    
        if (data.featured_image instanceof File) {
            // only append if it’s a new upload (a File)
            formData.append('featured_image', data.featured_image);
        }
    
        try {
            let response;
            if (isEditMode) {
                // console.log(formData.get('title'));
                response = await axios.post(`/api/blogs/${data.slug}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                console.log('Success:', response);

            } else {
                response = await axios.post('/api/blogs', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                console.log('Success:', response.data);
            }
    
    
            reset();
            editor.commands.setContent('<p>Start writing your blog here...</p>');
            setFeaturedImage(null);
    
            // window.location.href = '/blogs';
        } catch (err) {
            console.error('Error saving blog:', err);
            if (err.response?.data?.message) alert('Error: ' + err.response.data.message);
            else alert('Something went wrong while saving blog.');
        }
    };
    



    // --------------------
    // JSX Render
    // --------------------
    return (
        <div className=' relative py-16'>
            <div className='absolute left-0 top-0 -z-10 grid grid-cols-3'>
                <div className='bg-[#252550] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-tl-none'></div>
                <div className='bg-[#252550] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16'><div className='bg-white w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-br-none'></div></div>
                <div className='bg-[#6886ab] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-bl-none'></div>
                <div className='bg-[#6886ab] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-tr-none'></div>
                <div className='bg-[#6886ab] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16'><div className='bg-white w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-tl-none'></div></div>
                <div></div>
                <div className='bg-[#252550] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-br-none'></div>
            </div>
            <div className='absolute right-0 top-0 -z-10 grid grid-cols-3 '>
                <div className='bg-[#6886ab] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-tr-none'></div>
                <div className='bg-[#6886ab] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16'><div className='bg-white w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-bl-none'></div></div>
                <div className='bg-[#252550] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-tr-none'></div>
                <div></div>
                <div className='bg-[#6886ab] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-bl-none'></div>
                <div className='bg-[#252550] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16'><div className='bg-white w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-bl-none'></div></div>
                <div></div>
                <div></div>
                <div className='bg-[#252550] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-br-none'></div>
            </div>
            <div >
                <div className="bg-white max-w-4xl mx-auto p-6 rounded-lg shadow-md">
                    {/* Toolbar */}
                    <div className="sticky top-4 z-10 flex flex-wrap gap-2 mb-4 p-2 bg-gray-50 rounded-md border border-gray-200 shadow-sm">
                        {/* Bold */}
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={`p-2 rounded hover:bg-gray-200 `}
                            title="Bold"
                        >
                            <Bold />
                        </button>

                        {/* Italic */}
                        <button
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={`p-2 rounded hover:bg-gray-200 `}
                            title="Italic"
                        >
                            <Italic />
                        </button>

                        {/* Underline */}
                        <button
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            className={`p-2 rounded hover:bg-gray-200 `}
                            title="Underline"
                        >
                            <UnderlineIcon />
                        </button>

                        {/* Headings Dropdown */}
                        <Dropdown className="hover:bg-gray-200 rounded cursor-pointer">
                            <Dropdown.Trigger>
                                <div className="flex items-center px-2"><Heading /></div>
                            </Dropdown.Trigger>
                            <Dropdown.Content width="min-w-64">
                                {[1, 2, 3, 4, 5, 6].map((lvl) => {
                                    const Icon = [Heading1, Heading2, Heading3, Heading4, Heading5, Heading6][lvl - 1];
                                    return (
                                        <button
                                            key={lvl}
                                            onClick={() => editor.chain().focus().toggleHeading({ level: lvl }).run()}
                                            className={`flex items-center gap-2 w-full p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: lvl }) ? 'bg-gray-200' : ''}`}
                                        >
                                            <Icon />
                                            <span className="[#eaeaea]space-nowrap">Heading {lvl}</span>
                                        </button>
                                    );
                                })}
                            </Dropdown.Content>
                        </Dropdown>

                        {/* Lists */}
                        <button
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={`p-2 rounded hover:bg-gray-200 `}
                            title="Bullet List"
                        >
                            <List />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={`p-2 rounded hover:bg-gray-200 `}
                            title="Numbered List"
                        >
                            <ListOrdered />
                        </button>

                        {/* Color Picker */}
                        <Dropdown className="hover:bg-gray-200 rounded cursor-pointer">
                            <Dropdown.Trigger>
                                <div className="flex items-center px-2"><Baseline /></div>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <div className="p-2">
                                    <div className="grid grid-cols-5">
                                        {[
                                            '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
                                            '#FFFF00', '#00FFFF', '#FF00FF', '#C0C0C0', '#808080',
                                            '#800000', '#808000', '#008000', '#800080', '#008080',
                                            '#000080', '#FFA500', '#A52A2A', '#FFC0CB', '#FFD700'
                                        ].map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => editor.chain().focus().setColor(color).run()}
                                                className="h-8 border border-gray-300 hover:border-blue-500"
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

                        {/* Insert Image */}
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
                            <ImagePlus />
                        </button>
                    </div>

                    {/*Featured Image */}
                    <div className="relative flex flex-col gap-2 mb-4 w-full">
                        {/* Show preview if featuredImage exists */}
                        {featuredImage ? (
                            <div className="relative">
                                <img
                                    src={featuredImage.startsWith('http') ? featuredImage : `/storage/${featuredImage}`}
                                    alt="Featured preview"
                                    className="w-full h-64 object-cover rounded border"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/images/placeholder.jpg'; // Add a fallback image
                                    }}
                                />
                                <div className="absolute top-3 right-3 bg-gray-50 rounded-full p-1"
                                    onClick={(e) => { e.stopPropagation(); setFeaturedImage(null); setData('featured_image', null); }}
                                ><X/></div>
                            </div>
                        ) : (
                            <>
                                <input
                                    type="file"
                                    ref={featuredImageRef}
                                    onChange={handleFeaturedImageUpload}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <button type="button" onClick={triggerFeaturedImageInput} className="grow border border-dashed px-2 py-8 rounded hover:bg-gray-100 border-gray-300 flex items-center justify-center gap-2">
                                    <ImagePlus /> Add Featured Image
                                </button>
                            </>
                        )}


                    </div>

                    {/* Title */}
                    <div className="flex items-center gap-2 mb-4 w-full">
                        <input
                            type="text"
                            placeholder="Title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Excerpt */}
                    <div className="flex items-center gap-2 mb-4 w-full">
                        <textarea
                            placeholder="Excerpt"
                            value={data.excerpt}
                            onChange={(e) => setData('excerpt', e.target.value)}
                            className="grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Editor */}
                    <div className="max-w-none">
                        <EditorContent
                            editor={editor}
                            className="editor-content min-h-[300px] p-4 border border-gray-300 focus:outline-none rounded-md prose"
                        />
                    </div>

                    {/* Save Button */}
                    <div className="mt-6 flex justify-between">
                        <button
                            onClick={() => reset()}
                            className="px-4 py-2 text-[#252550] flex rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                        <a href="/blogs" className="flex items-center gap-2"><ArrowLeft/> Blogs</a>
                        </button>
                        <button
                            onClick={handleBlogUpload}
                            className="px-4 py-2 text-[#eaeaea] bg-[#92aec8] rounded-md hover:bg-[#7aa3c0] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            Save Blog
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    );
}
