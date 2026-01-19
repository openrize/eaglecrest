'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import Button from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

function BookingContent() {
    const searchParams = useSearchParams();
    const pkgName = searchParams.get('pkg');
    const date = searchParams.get('date');
    const travelers = searchParams.get('travelers');
    const price = searchParams.get('price');
    const [isConfirmed, setIsConfirmed] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        requests: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsConfirmed(true);
            window.scrollTo(0, 0);
        }, 1000);
    };

    if (isConfirmed) {
        return (
            <div className="container" style={{ padding: '6rem 0', textAlign: 'center', maxWidth: '600px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', color: 'var(--success)' }}>
                    <CheckCircle size={80} />
                </div>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Booking Confirmed!</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    Thank you, {formData.firstName}. Your trip to <strong>{pkgName}</strong> has been requested.
                    We have sent a confirmation email to {formData.email}.
                </p>
                <div style={{ padding: '2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', textAlign: 'left', marginBottom: '2rem' }}>
                    <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>Booking Reference: #EC-{Math.floor(Math.random() * 10000)}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div><strong>Date:</strong> {date}</div>
                        <div><strong>Travelers:</strong> {travelers}</div>
                        <div><strong>Total Paid:</strong> {price ? formatCurrency(parseFloat(price)) : '-'}</div>
                        <div><strong>Status:</strong> <span style={{ color: 'var(--success)', fontWeight: 600 }}>Confirmed</span></div>
                    </div>
                </div>
                <Button href="/">Return Home</Button>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '1000px' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>Complete Your Booking</h1>

            <div className="page-grid" style={{ gap: '4rem' /* Override gap locally if needed, but page-grid has default gap */ }}>
                {/* Form */}
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Traveler Details</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>First Name</label>
                                <input
                                    required
                                    className="input"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                                    value={formData.firstName}
                                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Last Name</label>
                                <input
                                    required
                                    className="input"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                                    value={formData.lastName}
                                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email</label>
                                <input
                                    required
                                    type="email"
                                    className="input"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Phone</label>
                                <input
                                    required
                                    type="tel"
                                    className="input"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Special Requests (Optional)</label>
                            <textarea
                                rows={4}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)', fontFamily: 'inherit' }}
                                value={formData.requests}
                                onChange={e => setFormData({ ...formData, requests: e.target.value })}
                            />
                        </div>

                        <Button size="lg" type="submit">Confirm & Pay</Button>
                    </form>
                </div>

                {/* Summary */}
                <div>
                    <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>Order Summary</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div>
                                <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Package</span>
                                <span style={{ fontWeight: 600 }}>{pkgName || 'Custom Trip'}</span>
                            </div>
                            <div>
                                <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Date</span>
                                <span style={{ fontWeight: 600 }}>{date || 'TBD'}</span>
                            </div>
                            <div>
                                <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Travelers</span>
                                <span style={{ fontWeight: 600 }}>{travelers || 1} Person(s)</span>
                            </div>
                        </div>

                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Total</span>
                            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>
                                {price ? formatCurrency(parseFloat(price)) : 'TBD'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BookingPage() {
    return (
        <Suspense fallback={<div className="container" style={{ padding: '4rem' }}>Loading...</div>}>
            <BookingContent />
        </Suspense>
    )
}
