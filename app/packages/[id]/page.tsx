import { getPackage } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Check, Clock, Star, Map } from 'lucide-react';
import BookingWidget from '@/components/BookingWidget';
import { AccordionItem } from '@/components/ui/Accordion';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function PackageDetail({ params }: PageProps) {
    const { id } = await params;
    const pkg = await getPackage(id);

    if (!pkg) {
        notFound();
    }

    return (
        <main>
            {/* Hero Lite */}
            <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '6rem 0 4rem' }}>
                <div className="container">
                    <span style={{ display: 'inline-block', padding: '4px 12px', backgroundColor: 'var(--accent)', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem' }}>
                        {pkg.tags && pkg.tags.length > 0 ? pkg.tags[0] : 'Package'}
                    </span>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', maxWidth: '800px' }}>{pkg.title}</h1>
                    <div style={{ display: 'flex', gap: '2rem', fontSize: '1.1rem', opacity: 0.9 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Map size={20} /> {pkg.destination}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={20} /> {pkg.duration}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Star size={20} fill="var(--warning)" stroke="var(--warning)" /> {pkg.rating || 4.8} ({pkg.reviews || 0} reviews)</span>
                    </div>
                </div>
            </div>

            <div className="container page-grid" style={{ padding: '4rem 0' }}>
                {/* Content */}
                <div>
                    <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', marginBottom: '3rem', boxShadow: 'var(--shadow-md)' }}>
                        <img src={pkg.image} alt={pkg.title} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                    </div>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Package Highlights</h2>
                        {pkg.highlights && pkg.highlights.length > 0 ? (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                {pkg.highlights.map((h, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <Check className="text-green-500" size={20} style={{ color: 'var(--success)' }} /> {h}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Experience the best of {pkg.destination} with our exclusive package including luxury accommodation, transfers, and guided tours.</p>
                        )}

                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Itinerary</h2>
                        <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0 1.5rem', backgroundColor: 'white' }}>
                            {pkg.itinerary && pkg.itinerary.length > 0 ? (
                                pkg.itinerary.map((dayItem: any, i: number) => (
                                    <AccordionItem key={i} title={`Day ${dayItem.day || i + 1}: ${dayItem.title || 'Exploration'}`} defaultOpen={i === 0}>
                                        {dayItem.description}
                                    </AccordionItem>
                                ))
                            ) : (
                                [1, 2, 3].map(day => (
                                    <AccordionItem key={day} title={`Day ${day}: Exploration & Leisure`} defaultOpen={day === 1}>
                                        Experience the local culture with a guided morning tour followed by a free afternoon to explore on your own.
                                    </AccordionItem>
                                ))
                            )}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div>
                    <BookingWidget basePrice={pkg.price} packageName={pkg.title} />
                </div>
            </div>
        </main>
    );
}
