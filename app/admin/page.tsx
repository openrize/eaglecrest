'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { destinations } from '@/lib/data';
import { Plus, Edit, Trash } from 'lucide-react';

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin') {
            setIsLoggedIn(true);
        } else {
            alert('Invalid password (try "admin")');
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="container" style={{ padding: '6rem 0', maxWidth: '400px', textAlign: 'center' }}>
                <h1 style={{ marginBottom: '2rem' }}>Admin Login</h1>
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="password"
                        placeholder="Password"
                        className="input"
                        style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit">Login</Button>
                </form>
            </div>
        );
    }

    return (
        <main style={{ padding: '4rem 0', backgroundColor: 'var(--background)', minHeight: '80vh' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem' }}>Admin Dashboard</h1>
                    <Button>Create New Destination <Plus size={18} style={{ marginLeft: '0.5rem' }} /></Button>
                </div>

                <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-md)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ backgroundColor: 'var(--surface-hover)', borderBottom: '1px solid var(--border)' }}>
                            <tr>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Name</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Location</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Price</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {destinations.map(dest => (
                                <tr key={dest.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem' }}>{dest.name}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{dest.location}</td>
                                    <td style={{ padding: '1rem' }}>${dest.priceStart}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button style={{ padding: '0.5rem', color: 'var(--primary)', cursor: 'pointer' }} title="Edit">
                                                <Edit size={18} />
                                            </button>
                                            <button style={{ padding: '0.5rem', color: 'var(--error)', cursor: 'pointer' }} title="Delete">
                                                <Trash size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <p>This is a mock dashboard. Changes are not persisted.</p>
                </div>
            </div>
        </main>
    );
}
