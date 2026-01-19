export default function AboutPage() {
    return (
        <main>
            <div style={{ padding: '6rem 0', textAlign: 'center', backgroundColor: 'var(--surface)' }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>About Eagle Crest</h1>
                    <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                        Founded in 2024, Eagle Crest Travel was born from a passion for exploring the unknown without compromising on comfort. We believe that travel is the only thing you buy that makes you richer.
                    </p>
                </div>
            </div>

            <div className="container" style={{ padding: '4rem 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop"
                            alt="Our Team"
                            style={{ borderRadius: 'var(--radius)', width: '100%' }}
                        />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Our Mission</h2>
                        <p style={{ lineHeight: 1.8, marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                            Our mission is to provide personalized, high-quality travel experiences that leave a lasting impact. We meticulously plan every detail of your journey so you can focus on making memories.
                        </p>
                        <p style={{ lineHeight: 1.8, color: 'var(--text-muted)' }}>
                            Whether you are looking for a relaxing beach getaway, an adventurous mountain trek, or a cultural city tour, our team of experts is here to make your dream vacation a reality.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
