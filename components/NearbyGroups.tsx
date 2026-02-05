'use client';

import { useState } from 'react';
import { NearbyGroup } from '@/lib/mockData';
import GroupCard from './GroupCard';
import { MapPin, Filter } from 'lucide-react';
import styles from './NearbyGroups.module.css';

interface NearbyGroupsProps {
    groups: NearbyGroup[];
    onGroupSelect?: (group: NearbyGroup) => void;
}

type CategoryFilter = 'all' | NearbyGroup['category'];

export default function NearbyGroups({ groups, onGroupSelect }: NearbyGroupsProps) {
    const [filter, setFilter] = useState<CategoryFilter>('all');

    const filters: { value: CategoryFilter; label: string; emoji: string }[] = [
        { value: 'all', label: 'All', emoji: '✨' },
        { value: 'party', label: 'Party', emoji: '🎉' },
        { value: 'food', label: 'Food', emoji: '🍷' },
        { value: 'adventure', label: 'Adventure', emoji: '🥾' },
        { value: 'culture', label: 'Culture', emoji: '🏛️' },
        { value: 'relaxation', label: 'Relax', emoji: '🧘' },
    ];

    const filteredGroups = filter === 'all'
        ? groups
        : groups.filter(g => g.category === filter);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.titleRow}>
                    <MapPin size={20} className={styles.icon} />
                    <h2 className={styles.title}>{groups.length} Nearby Groups</h2>
                </div>
                <p className={styles.subtitle}>Connect with travelers around you</p>
            </div>

            <div className={styles.filters}>
                {filters.map(f => (
                    <button
                        key={f.value}
                        className={`${styles.filterBtn} ${filter === f.value ? styles.filterActive : ''}`}
                        onClick={() => setFilter(f.value)}
                    >
                        <span className={styles.filterEmoji}>{f.emoji}</span>
                        <span>{f.label}</span>
                    </button>
                ))}
            </div>

            <div className={styles.groupList}>
                {filteredGroups.length > 0 ? (
                    filteredGroups.map(group => (
                        <GroupCard
                            key={group.id}
                            group={group}
                            onClick={() => onGroupSelect?.(group)}
                        />
                    ))
                ) : (
                    <div className={styles.emptyState}>
                        <Filter size={32} />
                        <p>No groups found for this filter</p>
                    </div>
                )}
            </div>
        </div>
    );
}
