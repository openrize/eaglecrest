'use client';

import { useState } from 'react';
import { Activity, Users, MessageCircle, Camera, UserPlus, MapPin, ChevronRight } from 'lucide-react';
import { NearbyGroup, NearbyUser } from '@/lib/mockData';
import styles from './ActivityFeed.module.css';

interface ActivityItem {
    id: string;
    type: 'join' | 'message' | 'photo' | 'create' | 'nearby';
    user: {
        id: string;
        name: string;
        avatar: string;
    };
    group?: {
        id: string;
        name: string;
        emoji: string;
    };
    content?: string;
    imageUrl?: string;
    timestamp: Date;
}

// Generate mock activity feed
const generateMockActivity = (): ActivityItem[] => [
    {
        id: '1',
        type: 'join',
        user: { id: 'u1', name: 'Sarah M.', avatar: 'https://i.pravatar.cc/150?img=10' },
        group: { id: 'g1', name: 'Sunset Beach Party', emoji: '🌅' },
        timestamp: new Date(Date.now() - 120000),
    },
    {
        id: '2',
        type: 'photo',
        user: { id: 'u2', name: 'Mike T.', avatar: 'https://i.pravatar.cc/150?img=11' },
        group: { id: 'g2', name: 'Foodies Unite', emoji: '🍕' },
        imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop',
        timestamp: new Date(Date.now() - 300000),
    },
    {
        id: '3',
        type: 'message',
        user: { id: 'u3', name: 'Emma L.', avatar: 'https://i.pravatar.cc/150?img=12' },
        group: { id: 'g3', name: 'Adventure Seekers', emoji: '🏔️' },
        content: "Who's ready for the hike tomorrow? 🥾",
        timestamp: new Date(Date.now() - 600000),
    },
    {
        id: '4',
        type: 'create',
        user: { id: 'u4', name: 'James K.', avatar: 'https://i.pravatar.cc/150?img=14' },
        group: { id: 'g4', name: 'Night Owls', emoji: '🦉' },
        timestamp: new Date(Date.now() - 900000),
    },
    {
        id: '5',
        type: 'nearby',
        user: { id: 'u5', name: 'Olivia R.', avatar: 'https://i.pravatar.cc/150?img=15' },
        timestamp: new Date(Date.now() - 1200000),
    },
    {
        id: '6',
        type: 'join',
        user: { id: 'u6', name: 'David P.', avatar: 'https://i.pravatar.cc/150?img=16' },
        group: { id: 'g1', name: 'Sunset Beach Party', emoji: '🌅' },
        timestamp: new Date(Date.now() - 1800000),
    },
    {
        id: '7',
        type: 'photo',
        user: { id: 'u7', name: 'Sophie W.', avatar: 'https://i.pravatar.cc/150?img=17' },
        group: { id: 'g5', name: 'City Explorers', emoji: '🏙️' },
        imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop',
        timestamp: new Date(Date.now() - 2400000),
    },
];

const formatTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
        case 'join': return <UserPlus size={14} />;
        case 'message': return <MessageCircle size={14} />;
        case 'photo': return <Camera size={14} />;
        case 'create': return <Users size={14} />;
        case 'nearby': return <MapPin size={14} />;
    }
};

const getActivityText = (item: ActivityItem): React.ReactNode => {
    switch (item.type) {
        case 'join':
            return <>joined <strong>{item.group?.emoji} {item.group?.name}</strong></>;
        case 'message':
            return <>sent a message in <strong>{item.group?.emoji} {item.group?.name}</strong></>;
        case 'photo':
            return <>shared a photo in <strong>{item.group?.emoji} {item.group?.name}</strong></>;
        case 'create':
            return <>created <strong>{item.group?.emoji} {item.group?.name}</strong></>;
        case 'nearby':
            return <>is now nearby</>;
    }
};

interface ActivityFeedProps {
    onUserClick?: (userId: string) => void;
    onGroupClick?: (groupId: string) => void;
}

export default function ActivityFeed({ onUserClick, onGroupClick }: ActivityFeedProps) {
    const [activities] = useState<ActivityItem[]>(() => generateMockActivity());

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Activity size={18} />
                <h3 className={styles.title}>Recent Activity</h3>
            </div>

            <div className={styles.feedList}>
                {activities.map(item => (
                    <div key={item.id} className={styles.feedItem}>
                        <div className={styles.avatarWrapper} onClick={() => onUserClick?.(item.user.id)}>
                            <img src={item.user.avatar} alt={item.user.name} className={styles.avatar} />
                            <div className={styles.activityIcon}>{getActivityIcon(item.type)}</div>
                        </div>

                        <div className={styles.content}>
                            <p className={styles.text}>
                                <strong onClick={() => onUserClick?.(item.user.id)}>{item.user.name}</strong>
                                {' '}
                                {getActivityText(item)}
                            </p>

                            {/* Message preview */}
                            {item.type === 'message' && item.content && (
                                <p className={styles.messagePreview}>"{item.content}"</p>
                            )}

                            {/* Photo preview */}
                            {item.type === 'photo' && item.imageUrl && (
                                <div className={styles.photoPreview}>
                                    <img src={item.imageUrl} alt="Shared photo" />
                                </div>
                            )}

                            <span className={styles.time}>{formatTime(item.timestamp)}</span>
                        </div>

                        {item.group && (
                            <button
                                className={styles.viewBtn}
                                onClick={() => onGroupClick?.(item.group!.id)}
                            >
                                <ChevronRight size={18} />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
