'use client';

import { useState } from 'react';
import { Calendar, Users } from 'lucide-react';
import Button from './ui/Button';
import { formatCurrency } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface BookingWidgetProps {
    basePrice: number;
    packageName: string;
}

export default function BookingWidget({ basePrice, packageName }: BookingWidgetProps) {
    const [travelers, setTravelers] = useState(2);
    const [date, setDate] = useState('');
    const router = useRouter();

    const total = basePrice * travelers;

    const handleBook = () => {
        if (!date) {
            alert('Please select a date');
            return;
        }
        // Navigate to booking page with params
        const query = new URLSearchParams({
            pkg: packageName,
            date,
            travelers: travelers.toString(),
            price: total.toString()
        }).toString();

        router.push(`/booking?${query}`);
    };

    return (
        <div style={{
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border)',
            position: 'sticky',
            top: '100px'
        }}>
            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Starting from</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>
                        {formatCurrency(basePrice)}
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>/ person</span>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                {/* Date */}
                <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>Travel Date</label>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '4px', padding: '0.5rem' }}>
                        <Calendar size={18} className="text-gray-400 mr-2" />
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.95rem', fontFamily: 'inherit' }}
                        />
                    </div>
                </div>

                {/* Travelers */}
                <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>Travelers</label>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '4px', padding: '0.5rem' }}>
                        <Users size={18} className="text-gray-400 mr-2" />
                        <input
                            type="number"
                            min="1"
                            max="20"
                            value={travelers}
                            onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
                            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.95rem', fontFamily: 'inherit' }}
                        />
                    </div>
                </div>
            </div>

            <div style={{ backgroundColor: 'var(--surface-hover)', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    <span>{formatCurrency(basePrice)} x {travelers} travelers</span>
                    <span>{formatCurrency(total)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <span>Taxes & Fees</span>
                    <span>Included</span>
                </div>
                <div style={{ borderTop: '1px solid var(--border)', marginTop: '0.5rem', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem' }}>
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                </div>
            </div>

            <Button onClick={handleBook} className="w-full" size="lg">Book Now</Button>
            <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                Free cancellation up to 7 days before trip.
            </div>
        </div>
    );
}
