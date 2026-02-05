'use client';

import { useState } from 'react';
import { X, MapPin, Calendar, Star, MessageCircle, UserPlus, Check, Globe, Heart, Camera, Mountain, Utensils } from 'lucide-react';
import { NearbyUser } from '@/lib/mockData';
import styles from './UserProfileModal.module.css';

interface UserProfileModalProps {
    user: NearbyUser & { lat: number; lng: number };
    onClose: () => void;
    onMessage?: (user: NearbyUser) => void;
}

// Extended user data (would come from backend in real app)
const getUserExtendedData = (userId: string) => ({
    bio: "Adventure seeker & food lover 🌍 Currently exploring new places and meeting amazing people along the way!",
    location: "San Francisco, CA",
    joinedDate: "Jan 2024",
    tripsCount: 12,
    friendsCount: 48,
    reviewScore: 4.8,
    interests: ['Adventure', 'Photography', 'Food', 'Culture', 'Nightlife'],
    languages: ['English', 'Spanish'],
    recentTrips: [
        { city: 'Tokyo', country: 'Japan', emoji: '🇯🇵' },
        { city: 'Barcelona', country: 'Spain', emoji: '🇪🇸' },
        { city: 'Bali', country: 'Indonesia', emoji: '🇮🇩' },
    ],
    verified: true,
});

const interestIcons: Record<string, React.ReactNode> = {
    'Adventure': <Mountain size={14} />,
    'Photography': <Camera size={14} />,
    'Food': <Utensils size={14} />,
    'Culture': <Globe size={14} />,
    'Nightlife': <Star size={14} />,
};

export default function UserProfileModal({ user, onClose, onMessage }: UserProfileModalProps) {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isFollowLoading, setIsFollowLoading] = useState(false);

    const extendedData = getUserExtendedData(user.id);

    const handleFollow = () => {
        setIsFollowLoading(true);
        setTimeout(() => {
            setIsFollowing(!isFollowing);
            setIsFollowLoading(false);
        }, 500);
    };

    const handleMessage = () => {
        onMessage?.(user);
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                {/* Header with cover */}
                <div className={styles.header}>
                    <div className={styles.coverGradient}></div>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={20} />
                    </button>

                    <div className={styles.avatarSection}>
                        <div className={styles.avatarWrapper}>
                            <img src={user.avatar} alt={user.name} className={styles.avatar} />
                            {user.status === 'online' && <div className={styles.onlineIndicator}></div>}
                            {extendedData.verified && (
                                <div className={styles.verifiedBadge}>
                                    <Check size={12} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Profile Info */}
                <div className={styles.content}>
                    <div className={styles.nameSection}>
                        <h2 className={styles.name}>{user.name}</h2>
                        {user.activity && (
                            <p className={styles.activity}>{user.activity}</p>
                        )}
                    </div>

                    {/* Stats */}
                    <div className={styles.stats}>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>{extendedData.tripsCount}</span>
                            <span className={styles.statLabel}>Trips</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>{extendedData.friendsCount}</span>
                            <span className={styles.statLabel}>Friends</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>
                                <Star size={14} style={{ marginRight: 4, color: '#F59E0B' }} />
                                {extendedData.reviewScore}
                            </span>
                            <span className={styles.statLabel}>Rating</span>
                        </div>
                    </div>

                    {/* Bio */}
                    <p className={styles.bio}>{extendedData.bio}</p>

                    {/* Info items */}
                    <div className={styles.infoList}>
                        <div className={styles.infoItem}>
                            <MapPin size={16} />
                            <span>{extendedData.location}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <Calendar size={16} />
                            <span>Joined {extendedData.joinedDate}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <Globe size={16} />
                            <span>{extendedData.languages.join(', ')}</span>
                        </div>
                    </div>

                    {/* Interests */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Interests</h3>
                        <div className={styles.interests}>
                            {extendedData.interests.map(interest => (
                                <span key={interest} className={styles.interestTag}>
                                    {interestIcons[interest]}
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Recent Trips */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Recent Trips</h3>
                        <div className={styles.trips}>
                            {extendedData.recentTrips.map((trip, i) => (
                                <div key={i} className={styles.tripCard}>
                                    <span className={styles.tripEmoji}>{trip.emoji}</span>
                                    <div className={styles.tripInfo}>
                                        <span className={styles.tripCity}>{trip.city}</span>
                                        <span className={styles.tripCountry}>{trip.country}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className={styles.actions}>
                        <button
                            className={`${styles.followBtn} ${isFollowing ? styles.followBtnFollowing : ''}`}
                            onClick={handleFollow}
                            disabled={isFollowLoading}
                        >
                            {isFollowLoading ? (
                                <span className={styles.spinner}></span>
                            ) : isFollowing ? (
                                <>
                                    <Check size={18} />
                                    Following
                                </>
                            ) : (
                                <>
                                    <UserPlus size={18} />
                                    Follow
                                </>
                            )}
                        </button>
                        <button className={styles.messageBtn} onClick={handleMessage}>
                            <MessageCircle size={18} />
                            Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
