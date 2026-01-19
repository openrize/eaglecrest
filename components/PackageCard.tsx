import Link from 'next/link';
import { Clock, Star, ArrowRight } from 'lucide-react';
import { Package } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import Button from './ui/Button';

interface PackageCardProps {
    pkg: Package;
}

export default function PackageCard({ pkg }: PackageCardProps) {
    return (
        <div className="card" style={{
            backgroundColor: 'var(--surface)',
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            position: 'relative'
        }}>
            <div style={{ position: 'relative', height: '220px', width: '100%' }}>
                <img
                    src={pkg.image}
                    alt={pkg.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                />
                <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    width: '100%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                    padding: '1rem',
                    color: 'white'
                }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.9 }}>
                        {pkg.destination}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 600, marginTop: '0.25rem' }}>
                        {pkg.title}
                    </h3>
                </div>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    {pkg.tags.map(tag => (
                        <span key={tag} style={{
                            fontSize: '0.75rem',
                            backgroundColor: 'var(--background)',
                            padding: '4px 8px',
                            borderRadius: '99px',
                            color: 'var(--text-muted)'
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={14} />
                        {pkg.duration}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Star size={14} fill="var(--warning)" color="var(--warning)" />
                        <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{pkg.rating}</span> ({pkg.reviews})
                    </div>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                    <div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', display: 'block' }}>From</span>
                        <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>{formatCurrency(pkg.price)}</span>
                    </div>
                    <Link href={`/packages/${pkg.id}`} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--primary)',
                        fontWeight: 600,
                        fontSize: '0.9rem'
                    }}>
                        Details <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
