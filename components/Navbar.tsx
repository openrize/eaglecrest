'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import Button from './ui/Button';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { name: 'Destinations', href: '/destinations' },
        { name: 'Packages', href: '/packages' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className={styles.navbar}>
            <div className={styles.navContainer}>
                {/* Logo */}
                <Link href="/" className={styles.logo} style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/logo.png" alt="Eagle Crest Travel" style={{ height: '85px', width: 'auto', objectFit: 'contain' }} />
                </Link>

                {/* Desktop Nav */}
                <nav className={styles.navLinks}>
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href} className={styles.link}>
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className={styles.actions}>
                    <button aria-label="Search" className="btn-ghost" style={{ padding: 8, display: 'flex' }}>
                        <Search size={20} />
                    </button>
                    <div className="hidden md:block" style={{ display: 'none' /* Temporary hide on mobile until I fix css media query logic for this specific div or just use class */ }}>
                        {/* Using inline style to hide on mobile purely for this swift MVP step, better to use the class logic */}
                    </div>
                    {/* Actually let's just show Book Now always or hide on small screens. I'll basic-hide it */}
                    <Button size="sm" className="hidden-mobile">Book Trip</Button>

                    {/* Mobile Toggle */}
                    <button
                        className={styles.mobileMenuBtn}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className={styles.mobileMenu}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={styles.link}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div style={{ marginTop: '1rem' }}>
                        <Button className="w-full" style={{ width: '100%' }}>Book a Trip</Button>
                    </div>
                </div>
            )}

            {/* Helper style for hidden-mobile since I didn't add it to module yet, actually I should add it to module */}
            <style jsx>{`
        @media (max-width: 768px) {
          .hidden-mobile {
            display: none !important;
          }
        }
      `}</style>
        </header>
    );
}
