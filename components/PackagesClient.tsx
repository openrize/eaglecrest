'use client';

import { useState } from 'react';
import PackageCard from '@/components/PackageCard';
import { Search, Tag } from 'lucide-react';
import { Package } from '@/lib/data';

interface PackagesClientProps {
    initialPackages: Package[];
}

export default function PackagesClient({ initialPackages }: PackagesClientProps) {
    const [filterTag, setFilterTag] = useState('All');

    // Extract unique tags
    const allTags = ['All', ...Array.from(new Set(initialPackages.flatMap(p => p.tags)))];

    const filteredPackages = initialPackages.filter(pkg => {
        if (filterTag === 'All') return true;
        return pkg.tags.includes(filterTag);
    });

    return (
        <div style={{ paddingTop: '80px' }}>
            {/* Header & Filter */}
            <div style={{ backgroundColor: 'var(--surface)', padding: '4rem 0' }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Curated Packages</h1>

                    {/* Tags Filter */}
                    <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setFilterTag(tag)}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '50px',
                                    border: filterTag === tag ? 'none' : '1px solid #ddd',
                                    backgroundColor: filterTag === tag ? 'var(--primary)' : 'white',
                                    color: filterTag === tag ? 'white' : 'var(--text)',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <Tag size={16} />
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="container" style={{ padding: '4rem 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {filteredPackages.map(pkg => (
                        <PackageCard key={pkg.id} pkg={pkg} />
                    ))}
                </div>
            </div>
        </div>
    );
}
