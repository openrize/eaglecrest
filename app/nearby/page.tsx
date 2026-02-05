'use client';

import { useState } from 'react';
import { X, Users, Plus, Check, PartyPopper, MessageCircle, Activity } from 'lucide-react';
import NearbyMap from '@/components/NearbyMap';
import NearbyGroups from '@/components/NearbyGroups';
import LocationSelector from '@/components/LocationSelector';
import GroupChat from '@/components/GroupChat';
import CreateGroupModal from '@/components/CreateGroupModal';
import UserProfileModal from '@/components/UserProfileModal';
import DirectMessageModal from '@/components/DirectMessageModal';
import ActivityFeed from '@/components/ActivityFeed';
import { StoriesRow, StoryViewer } from '@/components/StoriesViewer';
import { NearbyGroup, NearbyUser, City, defaultCity, getGroupsForCity, getUsersForCity } from '@/lib/mockData';
import styles from './nearby.module.css';

export default function NearbyPage() {
    const [selectedCity, setSelectedCity] = useState<City>(defaultCity);
    const [selectedGroup, setSelectedGroup] = useState<NearbyGroup | null>(null);
    const [joinedGroupId, setJoinedGroupId] = useState<string | null>(null);
    const [isJoining, setIsJoining] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [chatGroup, setChatGroup] = useState<NearbyGroup | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [customGroups, setCustomGroups] = useState<(NearbyGroup & { lat: number; lng: number })[]>([]);

    // User Profile state
    const [selectedUser, setSelectedUser] = useState<(NearbyUser & { lat: number; lng: number }) | null>(null);

    // Direct Message state
    const [dmUser, setDmUser] = useState<NearbyUser | null>(null);

    // Stories state
    const [viewingStoryUser, setViewingStoryUser] = useState<string | null>(null);

    // Activity panel state
    const [showActivityPanel, setShowActivityPanel] = useState(false);

    // Get groups and users for the selected city + custom created groups
    const cityGroups = getGroupsForCity(selectedCity);
    const allGroups = [...cityGroups, ...customGroups];

    const handleGroupSelect = (group: NearbyGroup) => {
        setSelectedGroup(group);
        // Reset join state when selecting a new group
        if (joinedGroupId !== group.id) {
            setJoinedGroupId(null);
        }
    };

    const handleUserSelect = (user: NearbyUser & { lat: number; lng: number }) => {
        setSelectedUser(user);
    };

    const handleCityChange = (city: City) => {
        setSelectedCity(city);
        setSelectedGroup(null);
        setJoinedGroupId(null);
        setSelectedUser(null);
    };

    const closeOverlay = () => {
        setSelectedGroup(null);
    };

    const handleJoinGroup = () => {
        if (!selectedGroup || isJoining) return;

        setIsJoining(true);

        // Simulate API call delay
        setTimeout(() => {
            setJoinedGroupId(selectedGroup.id);
            setIsJoining(false);
            setShowConfetti(true);

            // Hide confetti after animation
            setTimeout(() => {
                setShowConfetti(false);
            }, 2000);
        }, 800);
    };

    const handleOpenChat = () => {
        if (selectedGroup) {
            setChatGroup(selectedGroup);
            setShowChat(true);
            setSelectedGroup(null); // Close the overlay
        }
    };

    const handleCloseChat = () => {
        setShowChat(false);
        setChatGroup(null);
    };

    const handleCreateGroup = (groupData: Omit<NearbyGroup, 'id' | 'members'> & { latOffset: number; lngOffset: number }) => {
        const newGroup: NearbyGroup & { lat: number; lng: number } = {
            id: `custom-${Date.now()}`,
            name: groupData.name,
            description: groupData.description || '',
            emoji: groupData.emoji,
            category: groupData.category,
            memberCount: groupData.memberCount,
            latOffset: groupData.latOffset,
            lngOffset: groupData.lngOffset,
            members: [
                { id: 'current-user', name: 'You', avatar: 'https://i.pravatar.cc/150?img=68' }
            ],
            lat: selectedCity.lat + groupData.latOffset,
            lng: selectedCity.lng + groupData.lngOffset,
        };

        setCustomGroups(prev => [...prev, newGroup]);
        setShowCreateModal(false);

        // Auto-select and join the created group
        setSelectedGroup(newGroup);
        setJoinedGroupId(newGroup.id);
    };

    const handleOpenDM = (user: NearbyUser) => {
        setDmUser(user);
        setSelectedUser(null); // Close profile modal
    };

    const isGroupJoined = selectedGroup && joinedGroupId === selectedGroup.id;

    return (
        <div className={styles.pageWrapper}>
            {/* Stories Row */}
            <StoriesRow onViewStory={(userId) => setViewingStoryUser(userId)} />

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>Explore Nearby</h1>
                        <p className={styles.heroSubtitle}>
                            Discover travelers and groups around you
                        </p>
                        <LocationSelector
                            selectedCity={selectedCity}
                            onCityChange={handleCityChange}
                        />
                    </div>
                </div>
            </section>

            {/* Main Content - Map + Groups */}
            <div className={styles.mainContent}>
                <div className={styles.mapSection}>
                    <NearbyMap
                        selectedCity={selectedCity}
                        onGroupSelect={handleGroupSelect}
                        onUserSelect={handleUserSelect}
                        selectedGroup={selectedGroup}
                    />
                </div>
                <div className={styles.groupsSection}>
                    {/* Activity Feed Toggle */}
                    <button
                        className={styles.activityToggle}
                        onClick={() => setShowActivityPanel(!showActivityPanel)}
                    >
                        <Activity size={18} />
                        Recent Activity
                    </button>

                    {showActivityPanel ? (
                        <ActivityFeed />
                    ) : (
                        <NearbyGroups
                            groups={allGroups}
                            onGroupSelect={handleGroupSelect}
                        />
                    )}
                </div>
            </div>

            {/* Floating Action Button (Mobile) */}
            <button
                className={styles.fab}
                aria-label="Create group"
                onClick={() => setShowCreateModal(true)}
            >
                <Plus size={24} />
            </button>

            {/* Selected Group Overlay */}
            {selectedGroup && (
                <div className={styles.groupOverlay}>
                    {/* Confetti Animation */}
                    {showConfetti && (
                        <div className={styles.confettiContainer}>
                            {[...Array(20)].map((_, i) => (
                                <div
                                    key={i}
                                    className={styles.confetti}
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        animationDelay: `${Math.random() * 0.5}s`,
                                        backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181'][i % 5]
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    <div className={styles.overlayHeader}>
                        <h3 className={styles.overlayTitle}>
                            <span>{selectedGroup.emoji}</span>
                            {selectedGroup.name}
                        </h3>
                        <button className={styles.closeBtn} onClick={closeOverlay}>
                            <X size={20} />
                        </button>
                    </div>
                    <div className={styles.overlayContent}>
                        <p className={styles.overlayDescription}>
                            {selectedGroup.description}
                        </p>
                        <h4 style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Users size={16} />
                            {selectedGroup.memberCount + (isGroupJoined ? 1 : 0)} Travelers
                        </h4>
                        <div className={styles.membersList}>
                            {/* Show "You" if joined */}
                            {isGroupJoined && (
                                <div className={styles.memberItem}>
                                    <div
                                        className={styles.memberAvatar}
                                        style={{
                                            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontSize: '14px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        You
                                    </div>
                                    <span className={styles.memberName} style={{ color: 'var(--primary)', fontWeight: '600' }}>You</span>
                                </div>
                            )}
                            {selectedGroup.members.map(member => (
                                <div key={member.id} className={styles.memberItem}>
                                    <img
                                        src={member.avatar}
                                        alt={member.name}
                                        className={styles.memberAvatar}
                                    />
                                    <span className={styles.memberName}>{member.name}</span>
                                </div>
                            ))}
                            <div className={styles.memberItem}>
                                <div
                                    className={styles.memberAvatar}
                                    style={{
                                        background: 'var(--background)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--text-muted)',
                                        fontSize: '12px',
                                        fontWeight: '600'
                                    }}
                                >
                                    +{selectedGroup.memberCount - 3}
                                </div>
                                <span className={styles.memberName}>more</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className={styles.actionButtons}>
                            <button
                                className={`${styles.joinBtn} ${isGroupJoined ? styles.joinBtnJoined : ''} ${isJoining ? styles.joinBtnLoading : ''}`}
                                onClick={handleJoinGroup}
                                disabled={isJoining || !!isGroupJoined}
                            >
                                {isJoining ? (
                                    <>
                                        <span className={styles.spinner}></span>
                                        Joining...
                                    </>
                                ) : isGroupJoined ? (
                                    <>
                                        <Check size={20} />
                                        Joined!
                                    </>
                                ) : (
                                    'Join Group'
                                )}
                            </button>

                            {isGroupJoined && (
                                <button className={styles.chatBtn} onClick={handleOpenChat}>
                                    <MessageCircle size={20} />
                                    Open Chat
                                </button>
                            )}
                        </div>

                        {isGroupJoined && (
                            <p className={styles.joinedMessage}>
                                <PartyPopper size={16} />
                                You're in! Tap "Open Chat" to connect with the group.
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Group Chat */}
            {showChat && chatGroup && (
                <GroupChat group={chatGroup} onClose={handleCloseChat} />
            )}

            {/* Create Group Modal */}
            {showCreateModal && (
                <CreateGroupModal
                    onClose={() => setShowCreateModal(false)}
                    onCreate={handleCreateGroup}
                />
            )}

            {/* User Profile Modal */}
            {selectedUser && (
                <UserProfileModal
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                    onMessage={handleOpenDM}
                />
            )}

            {/* Direct Message Modal */}
            {dmUser && (
                <DirectMessageModal
                    user={dmUser}
                    onClose={() => setDmUser(null)}
                />
            )}

            {/* Story Viewer */}
            {viewingStoryUser && (
                <StoryViewer
                    userId={viewingStoryUser}
                    onClose={() => setViewingStoryUser(null)}
                />
            )}
        </div>
    );
}
