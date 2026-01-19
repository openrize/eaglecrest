import Link from 'next/link';
import { MapPin, Star, Clock } from 'lucide-react';
import { Destination } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import Button from './ui/Button';

interface DestinationCardProps {
    destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
    return (
        <div className="card" style={{
            backgroundColor: 'var(--surface)',
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            transition: 'transform 0.2s',
        }}>
            <div style={{ position: 'relative', height: '200px', width: '100%' }}>
                <img
                    src={destination.image}
                    alt={destination.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                />
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <Star size={14} fill="var(--warning)" color="var(--warning)" />
                    {destination.rating}
                </div>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
                        {destination.name}
                    </h3>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>
                        {formatCurrency(destination.priceStart)}
                    </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    <MapPin size={16} />
                    {destination.location}
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1.5rem', flex: 1 }}>
                    {destination.description.substring(0, 80)}...
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                        <Clock size={14} />
                        {destination.duration}
                    </div>
                    <Link href={`/destinations/${destination.id}`} style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'underline' }}>
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
