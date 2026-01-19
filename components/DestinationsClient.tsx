'use client';

import { useState } from 'react';
import DestinationCard from '@/components/DestinationCard';
import { Search, MapPin } from 'lucide-react';
import { Destination } from '@/lib/data';

interface DestinationsClientProps {
    initialDestinations: Destination[];
}

export default function DestinationsClient({ initialDestinations }: DestinationsClientProps) {
    const [filterRegion, setFilterRegion] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredDestinations = initialDestinations.filter(dest => {
        // Sanity destinations might not have 'location' matching region logic perfectly, 
        // so we check both 'region' and 'location'
        const region = dest.region || '';
        const location = dest.location || '';

        const matchesRegion = filterRegion === 'All'
            || region === filterRegion
            || location.includes(filterRegion);

        const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase())
            || location.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesRegion && matchesSearch;
    });

    return (
        <div style={{ paddingTop: '80px' }}>
            {/* Header & Filter */}
            <div style={{ backgroundColor: 'var(--surface)', padding: '4rem 0' }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Explore Destinations</h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>

                        {/* Search */}
                        <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
                            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} size={20} />
                            <input
                                type="text"
                                placeholder="Search destinations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '1rem 1rem 1rem 3rem',
                                    borderRadius: 'var(--radius)',
                                    border: '1px solid #ddd',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>

                        {/* Region Filter */}
                        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                            {['All', 'Europe', 'Asia', 'Africa', 'North America', 'South America'].map(region => (
                                <button
                                    key={region}
                                    onClick={() => setFilterRegion(region)}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '50px',
                                        border: filterRegion === region ? 'none' : '1px solid #ddd',
                                        backgroundColor: filterRegion === region ? 'var(--primary)' : 'white',
                                        color: filterRegion === region ? 'white' : 'var(--text)',
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {region}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="container" style={{ padding: '4rem 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {filteredDestinations.map(dest => (
                        <DestinationCard key={dest.id} destination={dest} />
                    ))}
                    {filteredDestinations.length === 0 && (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--text-light)' }}>
                            <MapPin size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                            <p>No destinations found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
