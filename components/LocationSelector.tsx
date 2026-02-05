'use client';

import { useState, useRef } from 'react';
import { City, cities } from '@/lib/mockData';
import { MapPin, ChevronDown, Search } from 'lucide-react';
import styles from './LocationSelector.module.css';

interface LocationSelectorProps {
    selectedCity: City;
    onCityChange: (city: City) => void;
}

export default function LocationSelector({ selectedCity, onCityChange }: LocationSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filteredCities = cities.filter(city =>
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.country.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelect = (city: City) => {
        onCityChange(city);
        setIsOpen(false);
        setSearchQuery('');
    };

    return (
        <div className={styles.container} ref={dropdownRef}>
            <button
                className={styles.trigger}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <MapPin size={18} className={styles.icon} />
                <span className={styles.cityName}>
                    <span className={styles.emoji}>{selectedCity.emoji}</span>
                    {selectedCity.name}, {selectedCity.country}
                </span>
                <ChevronDown
                    size={18}
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                />
            </button>

            {isOpen && (
                <>
                    <div className={styles.backdrop} onClick={() => setIsOpen(false)} />
                    <div className={styles.dropdown}>
                        <div className={styles.searchContainer}>
                            <Search size={16} className={styles.searchIcon} />
                            <input
                                type="text"
                                className={styles.searchInput}
                                placeholder="Search cities..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                        </div>

                        <div className={styles.cityList} role="listbox">
                            {filteredCities.length > 0 ? (
                                filteredCities.map(city => (
                                    <button
                                        key={city.id}
                                        className={`${styles.cityOption} ${city.id === selectedCity.id ? styles.cityOptionSelected : ''}`}
                                        onClick={() => handleSelect(city)}
                                        role="option"
                                        aria-selected={city.id === selectedCity.id}
                                    >
                                        <span className={styles.optionEmoji}>{city.emoji}</span>
                                        <div className={styles.optionInfo}>
                                            <span className={styles.optionName}>{city.name}</span>
                                            <span className={styles.optionCountry}>{city.country}</span>
                                        </div>
                                        {city.id === selectedCity.id && (
                                            <span className={styles.checkmark}>✓</span>
                                        )}
                                    </button>
                                ))
                            ) : (
                                <div className={styles.noResults}>
                                    No cities found
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
