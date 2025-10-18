// resources/js/Components/PdfAttachment.js
import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import PdfAttachmentView from './PdfAttachmentView';

const PdfAttachment = Node.create({
    name: 'pdfAttachment',
    group: 'block',
    atom: true,

    addAttributes() {
        return {
            url: { default: null },
            name: { default: '' },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-type="pdf-attachment"]',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', { 'data-type': 'pdf-attachment' }];
    },

    addNodeView() {
        return ReactNodeViewRenderer(PdfAttachmentView);
    },
});

export default PdfAttachment;
