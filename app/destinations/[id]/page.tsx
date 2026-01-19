import { getDestination, getPackages } from '@/lib/data';
import { notFound } from 'next/navigation';
import Button from '@/components/ui/Button';
import PackageCard from '@/components/PackageCard';
import { AccordionItem } from '@/components/ui/Accordion';
import { MapPin, Clock, DollarSign, Star, Check } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function DestinationDetail({ params }: PageProps) {
    const { id } = await params;
    const destination = await getDestination(id);

    if (!destination) {
        notFound();
    }

    // Find related packages
    const allPackages = await getPackages();
    const relatedPackages = allPackages.filter(p =>
        (p.destinationId && p.destinationId === destination.id) ||
        p.destination.toLowerCase().includes(destination.name.toLowerCase())
    );

    return (
        <main>
            {/* Hero */}
            <div style={{ position: 'relative', height: '60vh', minHeight: '400px' }}>
                <img
                    src={destination.image}
                    alt={destination.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                    padding: '4rem 0 2rem',
                    color: 'white'
                }}>
                    <div className="container">
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '1.1rem', opacity: 0.9 }}>
                            <MapPin size={20} /> {destination.location || destination.name}
                        </span>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{destination.name}</h1>
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Clock size={20} /> {destination.duration}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Star size={20} fill="#fbbf24" stroke="#fbbf24" /> {destination.rating} Rating
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.2rem' }}>
                                From {formatCurrency(destination.priceStart)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container page-grid" style={{ padding: '4rem 0' }}>
                {/* Main Content */}
                <div>
                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Overview</h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>
                            {destination.description}
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Highlights</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            {destination.highlights.map(highlight => (
                                <div key={highlight} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '1rem',
                                    backgroundColor: 'var(--surface)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius)'
                                }}>
                                    <div style={{ color: 'var(--success)' }}><Check size={20} /></div>
                                    <span style={{ fontWeight: 500 }}>{highlight}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Suggested Itinerary</h2>
                        <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0 1.5rem', backgroundColor: 'white' }}>
                            <AccordionItem title="Day 1: Arrival & Welcome" defaultOpen>
                                Arrive at the airport and transfer to your luxury hotel. Enjoy a welcome dinner with local specialties.
                            </AccordionItem>
                            <AccordionItem title="Day 2: City Tour & Culture">
                                Explore the historic landmarks of the city. Visit ancient temples, local markets, and experience the vibrant culture.
                            </AccordionItem>
                            <AccordionItem title="Day 3: Adventure & Nature">
                                Head out to the scenic countryside. Enjoy hiking, boat rides, or simply relax by the pristine landscapes.
                            </AccordionItem>
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                    <div style={{
                        padding: '2rem',
                        backgroundColor: 'white',
                        borderRadius: 'var(--radius)',
                        boxShadow: 'var(--shadow-lg)',
                        border: '1px solid var(--border)'
                    }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Book This Trip</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                            Interested in visiting {destination.name}? customize your itinerary or choose a package.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Button href="/contact" className="w-full">Request Custom Quote</Button>
                            <Button href="/packages" variant="secondary" className="w-full">View Packages</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Packages */}
            {relatedPackages.length > 0 && (
                <div style={{ backgroundColor: 'var(--background)', padding: '4rem 0' }}>
                    <div className="container">
                        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Available Packages</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                            {relatedPackages.map(pkg => (
                                <PackageCard key={pkg.id} pkg={pkg} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
