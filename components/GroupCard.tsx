'use client';

import { NearbyGroup, categoryColors } from '@/lib/mockData';
import { Users, ChevronRight } from 'lucide-react';
import styles from './GroupCard.module.css';

interface GroupCardProps {
    group: NearbyGroup;
    onClick?: () => void;
}

export default function GroupCard({ group, onClick }: GroupCardProps) {
    const categoryColor = categoryColors[group.category];

    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.header}>
                <div
                    className={styles.emojiContainer}
                    style={{ backgroundColor: `${categoryColor}20` }}
                >
                    <span className={styles.emoji}>{group.emoji}</span>
                </div>
                <div className={styles.info}>
                    <h3 className={styles.name}>{group.name}</h3>
                    {group.description && (
                        <p className={styles.description}>{group.description}</p>
                    )}
                </div>
                <ChevronRight size={20} className={styles.arrow} />
            </div>

            <div className={styles.footer}>
                <div className={styles.members}>
                    <div className={styles.avatarStack}>
                        {group.members.slice(0, 3).map((member, index) => (
                            <img
                                key={member.id}
                                src={member.avatar}
                                alt={member.name}
                                className={styles.avatar}
                                style={{
                                    zIndex: 3 - index,
                                    marginLeft: index > 0 ? '-10px' : '0'
                                }}
                            />
                        ))}
                    </div>
                    <div className={styles.memberCount}>
                        <Users size={14} />
                        <span>{group.memberCount} Travelers</span>
                    </div>
                </div>

                <span
                    className={styles.categoryBadge}
                    style={{
                        backgroundColor: `${categoryColor}15`,
                        color: categoryColor
                    }}
                >
                    {group.category}
                </span>
            </div>
        </div>
    );
}
