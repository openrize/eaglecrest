import { getDestinations, getPackages } from '@/lib/data';
import SearchModule from '@/components/SearchModule';
import DestinationCard from '@/components/DestinationCard';
import PackageCard from '@/components/PackageCard';
import Button from '@/components/ui/Button';
import { CheckCircle } from 'lucide-react';

export default async function Home() {
  const allDestinations = await getDestinations();
  const allPackages = await getPackages();
  const featuredDestinations = allDestinations.slice(0, 3);
  const popularPackages = allPackages.slice(0, 3);

  return (
    <main>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '85vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1
        }}>
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2921&auto=format&fit=crop"
            alt="Hero Background"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }}
          />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', width: '100%' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            marginBottom: '1rem',
            color: 'white',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            Discover the Extraordinary
          </h1>
          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            marginBottom: '3rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            opacity: 0.9
          }}>
            Curated journeys to the world's most breathtaking destinations.
          </p>

          <SearchModule />
        </div>
      </section>

      {/* Featured Destinations */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--background)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Featured Destinations</h2>
              <p style={{ color: 'var(--text-muted)' }}>Explore our hand-picked selection of must-visit places.</p>
            </div>
            <Button variant="outline" href="/destinations">View All</Button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {featuredDestinations.map(dest => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Packages */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Popular Packages</h2>
            <p style={{ color: 'var(--text-muted)' }}>All-inclusive experiences designed for you.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {popularPackages.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Button variant="primary" size="lg" href="/packages">View All Packages</Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--primary)', color: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'white' }}>Why Eagle Crest?</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', textAlign: 'center' }}>
            {[
              { title: 'Curated Experiences', desc: 'Every trip is hand-picked by our experts.' },
              { title: 'Best Price Guarantee', desc: 'We maximize value without compromising luxury.' },
              { title: '24/7 Support', desc: 'We are with you every step of the journey.' },
              { title: 'Flexible Booking', desc: 'Change your plans with peace of mind.' }
            ].map((item, i) => (
              <div key={i}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  color: 'var(--accent)'
                }}>
                  <CheckCircle size={32} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'white' }}>{item.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
