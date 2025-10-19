// resources/js/Components/PdfAttachmentView.js
import { NodeViewWrapper } from '@tiptap/react';
import { File, X } from 'lucide-react';

export default function PdfAttachmentView({ node, deleteNode }) {
    const { url, name } = node.attrs;

    return (
        <NodeViewWrapper className="flex items-center justify-between gap-2 bg-[#dfe6ee] text-[#6886ab] p-2 rounded my-2">
            <div className="flex items-center gap-2">
                <File />
                <a
                    href={url}
                    target="_blank"
                    download
                    className="hover:underline flex items-center gap-1"
                >
                    {name}
                </a>
            </div>

            <button
                type="button"
                className="text-red-500 hover:text-red-600"
                onClick={deleteNode}
            >
                <X />
            </button>
        </NodeViewWrapper>
    );
}
