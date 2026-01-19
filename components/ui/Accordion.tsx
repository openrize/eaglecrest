'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div style={{ borderBottom: '1px solid var(--border)', marginBottom: '0.5rem' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem 0',
                    textAlign: 'left',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: isOpen ? 'var(--primary)' : 'var(--text-main)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                {title}
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {isOpen && (
                <div style={{ paddingBottom: '1.5rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {children}
                </div>
            )}
        </div>
    );
}

export default function Accordion({ items }: { items: { title: string, content: React.ReactNode }[] }) {
    return (
        <div>
            {items.map((item, index) => (
                <AccordionItem key={index} title={item.title}>
                    {item.content}
                </AccordionItem>
            ))}
        </div>
    );
}
