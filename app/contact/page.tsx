import Button from '@/components/ui/Button';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
    return (
        <main>
            <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '6rem 0 4rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Contact Us</h1>
                <p style={{ opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>We are here to help you plan your dream vacation. Reach out to us anytime.</p>
            </div>

            <div className="container" style={{ padding: '4rem 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                {/* Info */}
                <div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Get in Touch</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ backgroundColor: 'var(--surface)', padding: '1rem', borderRadius: '50%' }}><Mail className="text-blue-900" /></div>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Email</h3>
                                <p style={{ color: 'var(--text-muted)' }}>eaglecrest04@gmail.com</p>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>24/7 Support</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ backgroundColor: 'var(--surface)', padding: '1rem', borderRadius: '50%' }}><MapPin className="text-blue-900" /></div>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Office</h3>
                                <p style={{ color: 'var(--text-muted)' }}>100 Luxury Lane, Suite 500<br />New York, NY 10001</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Send a Message</h2>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Name</label>
                            <input className="input" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)' }} placeholder="Your Name" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email</label>
                            <input type="email" className="input" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)' }} placeholder="Your Email" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Message</label>
                            <textarea rows={4} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)', fontFamily: 'inherit' }} placeholder="How can we help?" />
                        </div>
                        <Button size="lg">Send Message</Button>
                    </form>
                </div>
            </div>
        </main>
    );
}
