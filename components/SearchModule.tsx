'use client';

import { useState } from 'react';
import { Search, Calendar, Users, MapPin } from 'lucide-react';
import Button from './ui/Button';

export default function SearchModule() {
    return (
        <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow-lg)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            alignItems: 'end',
            maxWidth: '1000px',
            width: '100%',
            margin: '0 auto',
            position: 'relative',
            zIndex: 10
        }}>
            {/* Destination */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Location</label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '4px', padding: '0.5rem' }}>
                    <MapPin size={18} className="text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Where are you going?"
                        style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.95rem' }}
                    />
                </div>
            </div>

            {/* Dates */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Date</label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '4px', padding: '0.5rem' }}>
                    <Calendar size={18} className="text-gray-400 mr-2" />
                    <input
                        type="date"
                        style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.95rem', fontFamily: 'inherit' }}
                    />
                </div>
            </div>

            {/* Travelers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Travelers</label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '4px', padding: '0.5rem' }}>
                    <Users size={18} className="text-gray-400 mr-2" />
                    <select style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.95rem', background: 'transparent' }}>
                        <option>2 Adults</option>
                        <option>1 Adult</option>
                        <option>Family (2A, 2C)</option>
                    </select>
                </div>
            </div>

            <Button size="lg" className="w-full">
                <Search size={20} style={{ marginRight: '0.5rem' }} /> Explore
            </Button>
        </div>
    );
}
