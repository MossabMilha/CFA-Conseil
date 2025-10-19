import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import PdfAttachmentView from './PdfAttachmentView'

const PdfAttachment = Node.create({
    name: 'pdfAttachment',
    group: 'block',
    atom: true,

    addAttributes() {
        return {
            url: { default: null },
            name: { default: '' },
            dataTempId: { default: null },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-type="pdf-attachment"]',
                getAttrs: (el) => ({
                    url: el.getAttribute('data-url') || null,
                    name: el.getAttribute('data-name') || '',
                    dataTempId: el.getAttribute('data-temp-id') || null,
                }),
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'div',
            {
                'data-type': 'pdf-attachment',
                'data-url': HTMLAttributes.url,
                'data-name': HTMLAttributes.name,
                'data-temp-id': HTMLAttributes.dataTempId,
                class: 'pdf-attachment',
            },
            [
                'div',
                { class: 'flex items-center gap-2 bg-[#dfe6ee] text-[#6886ab] p-2 rounded my-2' },
                ['span', { class: 'text-[#6886ab]' }, '📄'],
                [
                    'a',
                    {
                        href: HTMLAttributes.url,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        download: true,
                        class: 'hover:underline',
                    },
                    HTMLAttributes.name || 'Download PDF',
                ],
            ],
        ]
    },

    addNodeView() {
        return ReactNodeViewRenderer(PdfAttachmentView)
    },
})

export default PdfAttachment
