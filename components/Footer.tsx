import Link from 'next/link';

export default function Footer() {
    return (
        <footer style={{ backgroundColor: 'var(--primary)', color: 'var(--text-inverted)', padding: '4rem 0 2rem' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>

                    {/* Brand */}
                    <div>
                        <img src="/logo.png" alt="Eagle Crest" style={{ height: '90px', marginBottom: '1.5rem', objectFit: 'contain' }} />
                        <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                            Curating exclusive travel experiences for the modern explorer. Discover the world with unparalleled elegance.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 600 }}>Explore</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li><Link href="/destinations" style={{ color: 'rgba(255,255,255,0.7)' }}>Destinations</Link></li>
                            <li><Link href="/packages" style={{ color: 'rgba(255,255,255,0.7)' }}>Packages</Link></li>
                            <li><Link href="/about" style={{ color: 'rgba(255,255,255,0.7)' }}>About Us</Link></li>
                            <li><Link href="/contact" style={{ color: 'rgba(255,255,255,0.7)' }}>Contact</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 600 }}>Support</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li><Link href="/faq" style={{ color: 'rgba(255,255,255,0.7)' }}>FAQ</Link></li>
                            <li><Link href="/terms" style={{ color: 'rgba(255,255,255,0.7)' }}>Terms & Conditions</Link></li>
                            <li><Link href="/privacy" style={{ color: 'rgba(255,255,255,0.7)' }}>Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 600 }}>Newsletter</h4>
                        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>Subscribe for latest offers.</p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                                type="email"
                                placeholder="Email address"
                                style={{
                                    padding: '0.5rem',
                                    borderRadius: '4px',
                                    border: 'none',
                                    flex: 1
                                }}
                            />
                            <button className="btn-accent" style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                    © {new Date().getFullYear()} Eagle Crest Travel. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
