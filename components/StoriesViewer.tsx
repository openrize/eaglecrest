'use client';

import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Send, Pause, Play } from 'lucide-react';
import styles from './StoriesViewer.module.css';

interface Story {
    id: string;
    imageUrl: string;
    caption?: string;
    timestamp: Date;
}

interface StoryUser {
    id: string;
    name: string;
    avatar: string;
    stories: Story[];
    hasUnseenStories?: boolean;
}

// Mock stories data
const mockStoryUsers: StoryUser[] = [
    {
        id: 'you',
        name: 'Your Story',
        avatar: 'https://i.pravatar.cc/150?img=68',
        stories: [],
        hasUnseenStories: false,
    },
    {
        id: 'user1',
        name: 'Sarah M.',
        avatar: 'https://i.pravatar.cc/150?img=10',
        hasUnseenStories: true,
        stories: [
            { id: 's1', imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop', caption: 'Amazing view from the top! 🏔️', timestamp: new Date(Date.now() - 3600000) },
            { id: 's2', imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=800&fit=crop', caption: 'Nature at its best ✨', timestamp: new Date(Date.now() - 7200000) },
        ],
    },
    {
        id: 'user2',
        name: 'Mike T.',
        avatar: 'https://i.pravatar.cc/150?img=11',
        hasUnseenStories: true,
        stories: [
            { id: 's3', imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=800&fit=crop', caption: 'Road trip vibes 🚗', timestamp: new Date(Date.now() - 1800000) },
        ],
    },
    {
        id: 'user3',
        name: 'Emma L.',
        avatar: 'https://i.pravatar.cc/150?img=12',
        hasUnseenStories: false,
        stories: [
            { id: 's4', imageUrl: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&h=800&fit=crop', caption: 'Beach day! 🏖️', timestamp: new Date(Date.now() - 14400000) },
        ],
    },
    {
        id: 'user4',
        name: 'James K.',
        avatar: 'https://i.pravatar.cc/150?img=14',
        hasUnseenStories: true,
        stories: [
            { id: 's5', imageUrl: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&h=800&fit=crop', caption: 'City lights ✨', timestamp: new Date(Date.now() - 5400000) },
        ],
    },
    {
        id: 'user5',
        name: 'Olivia R.',
        avatar: 'https://i.pravatar.cc/150?img=15',
        hasUnseenStories: false,
        stories: [
            { id: 's6', imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=800&fit=crop', caption: 'Found paradise 🌴', timestamp: new Date(Date.now() - 10800000) },
        ],
    },
];

interface StoriesRowProps {
    onViewStory: (userId: string) => void;
}

export function StoriesRow({ onViewStory }: StoriesRowProps) {
    return (
        <div className={styles.storiesRow}>
            {mockStoryUsers.map(user => (
                <button
                    key={user.id}
                    className={styles.storyItem}
                    onClick={() => user.stories.length > 0 && onViewStory(user.id)}
                    disabled={user.stories.length === 0 && user.id !== 'you'}
                >
                    <div className={`${styles.storyRing} ${user.hasUnseenStories ? styles.storyRingUnseen : ''} ${user.id === 'you' ? styles.storyRingAdd : ''}`}>
                        <img src={user.avatar} alt={user.name} className={styles.storyAvatar} />
                        {user.id === 'you' && (
                            <div className={styles.addBadge}>+</div>
                        )}
                    </div>
                    <span className={styles.storyName}>{user.name}</span>
                </button>
            ))}
        </div>
    );
}

interface StoryViewerProps {
    userId: string;
    onClose: () => void;
}

export function StoryViewer({ userId, onClose }: StoryViewerProps) {
    const [currentUserIndex, setCurrentUserIndex] = useState(() =>
        mockStoryUsers.findIndex(u => u.id === userId)
    );
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const [replyText, setReplyText] = useState('');
    const [liked, setLiked] = useState(false);

    const progressInterval = useRef<NodeJS.Timeout | null>(null);

    const currentUser = mockStoryUsers[currentUserIndex];
    const currentStory = currentUser?.stories[currentStoryIndex];

    const STORY_DURATION = 5000; // 5 seconds per story

    useEffect(() => {
        if (!isPaused && currentStory) {
            progressInterval.current = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        goToNextStory();
                        return 0;
                    }
                    return prev + (100 / (STORY_DURATION / 100));
                });
            }, 100);
        }

        return () => {
            if (progressInterval.current) {
                clearInterval(progressInterval.current);
            }
        };
    }, [isPaused, currentStoryIndex, currentUserIndex]);

    const goToNextStory = () => {
        if (currentStoryIndex < currentUser.stories.length - 1) {
            setCurrentStoryIndex(prev => prev + 1);
            setProgress(0);
            setLiked(false);
        } else {
            goToNextUser();
        }
    };

    const goToPrevStory = () => {
        if (currentStoryIndex > 0) {
            setCurrentStoryIndex(prev => prev - 1);
            setProgress(0);
            setLiked(false);
        } else {
            goToPrevUser();
        }
    };

    const goToNextUser = () => {
        const nextUserIndex = mockStoryUsers.findIndex((u, i) => i > currentUserIndex && u.stories.length > 0);
        if (nextUserIndex !== -1) {
            setCurrentUserIndex(nextUserIndex);
            setCurrentStoryIndex(0);
            setProgress(0);
            setLiked(false);
        } else {
            onClose();
        }
    };

    const goToPrevUser = () => {
        const prevUserIndex = [...mockStoryUsers].reverse().findIndex((u, i) =>
            mockStoryUsers.length - 1 - i < currentUserIndex && u.stories.length > 0
        );
        if (prevUserIndex !== -1) {
            const actualIndex = mockStoryUsers.length - 1 - prevUserIndex;
            setCurrentUserIndex(actualIndex);
            setCurrentStoryIndex(mockStoryUsers[actualIndex].stories.length - 1);
            setProgress(0);
            setLiked(false);
        }
    };

    const handleTap = (e: React.MouseEvent | React.TouchEvent) => {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const tapPosition = (x - rect.left) / rect.width;

        if (tapPosition < 0.3) {
            goToPrevStory();
        } else if (tapPosition > 0.7) {
            goToNextStory();
        } else {
            setIsPaused(!isPaused);
        }
    };

    const handleReply = () => {
        if (replyText.trim()) {
            setReplyText('');
            // Would send reply to backend
        }
    };

    if (!currentStory) {
        return null;
    }

    return (
        <div className={styles.viewerOverlay}>
            <div className={styles.viewerContainer}>
                {/* Progress bars */}
                <div className={styles.progressBars}>
                    {currentUser.stories.map((story, i) => (
                        <div key={story.id} className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{
                                    width: i === currentStoryIndex ? `${progress}%` :
                                        i < currentStoryIndex ? '100%' : '0%'
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Header */}
                <div className={styles.viewerHeader}>
                    <div className={styles.viewerUser}>
                        <img src={currentUser.avatar} alt={currentUser.name} className={styles.viewerAvatar} />
                        <div>
                            <span className={styles.viewerName}>{currentUser.name}</span>
                            <span className={styles.viewerTime}>
                                {Math.floor((Date.now() - currentStory.timestamp.getTime()) / 3600000)}h ago
                            </span>
                        </div>
                    </div>
                    <div className={styles.viewerActions}>
                        <button onClick={() => setIsPaused(!isPaused)}>
                            {isPaused ? <Play size={20} /> : <Pause size={20} />}
                        </button>
                        <button onClick={onClose}>
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Story content */}
                <div
                    className={styles.storyContent}
                    onClick={handleTap}
                    onTouchStart={handleTap}
                >
                    <img src={currentStory.imageUrl} alt="" className={styles.storyImage} />

                    {/* Navigation areas */}
                    <div className={styles.navLeft} onClick={goToPrevStory}>
                        <ChevronLeft size={32} />
                    </div>
                    <div className={styles.navRight} onClick={goToNextStory}>
                        <ChevronRight size={32} />
                    </div>
                </div>

                {/* Caption */}
                {currentStory.caption && (
                    <div className={styles.caption}>{currentStory.caption}</div>
                )}

                {/* Reply bar */}
                <div className={styles.replyBar}>
                    <input
                        type="text"
                        className={styles.replyInput}
                        placeholder={`Reply to ${currentUser.name}...`}
                        value={replyText}
                        onChange={e => setReplyText(e.target.value)}
                        onFocus={() => setIsPaused(true)}
                        onBlur={() => setIsPaused(false)}
                    />
                    <button
                        className={`${styles.likeBtn} ${liked ? styles.likeBtnActive : ''}`}
                        onClick={() => setLiked(!liked)}
                    >
                        <Heart size={24} fill={liked ? '#EF4444' : 'none'} />
                    </button>
                    {replyText.trim() && (
                        <button className={styles.sendBtn} onClick={handleReply}>
                            <Send size={20} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
