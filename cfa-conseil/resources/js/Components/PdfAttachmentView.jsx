// resources/js/Components/PdfAttachmentView.jsx
import React from 'react';
import { File, X } from 'lucide-react';
import { NodeViewWrapper } from '@tiptap/react';

export default function PdfAttachmentView({ node, deleteNode  }) {
    const { attrs } = node;

    return (
        <NodeViewWrapper className="flex items-center justify-between gap-2 bg-[#dfe6ee] text-[#6886ab] p-2 rounded my-2">
            <div className="flex items-center gap-2">
                <File />
                <a
                    href={attrs.url}
                    target="_blank"
                    download
                    className=" hover:underline flex items-center gap-1"
                > {attrs.name}
                </a>
            </div>

            <button type="button" className="text-red-500 hover:text-red-600" onClick={deleteNode}><X/></button>
        </NodeViewWrapper>
    );
}
