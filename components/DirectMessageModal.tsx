'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Send, Smile, MoreHorizontal, Phone, Video } from 'lucide-react';
import { NearbyUser } from '@/lib/mockData';
import styles from './DirectMessageModal.module.css';

interface DirectMessageModalProps {
    user: NearbyUser;
    onClose: () => void;
}

interface DirectMessage {
    id: string;
    content: string;
    senderId: string;
    timestamp: Date;
}

// Generate some mock DM messages
const getMockDMs = (userId: string): DirectMessage[] => [
    {
        id: '1',
        content: 'Hey! I saw you on the map nearby 👋',
        senderId: 'current-user',
        timestamp: new Date(Date.now() - 3600000),
    },
    {
        id: '2',
        content: 'Hi! Yes, I just arrived here yesterday. Are you traveling too?',
        senderId: userId,
        timestamp: new Date(Date.now() - 3500000),
    },
    {
        id: '3',
        content: 'Yeah! Been here for a few days now. This place is amazing!',
        senderId: 'current-user',
        timestamp: new Date(Date.now() - 3400000),
    },
    {
        id: '4',
        content: 'Totally agree! Have you tried the local food scene yet? 🍜',
        senderId: userId,
        timestamp: new Date(Date.now() - 3300000),
    },
];

const formatTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'now';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export default function DirectMessageModal({ user, onClose }: DirectMessageModalProps) {
    const [messages, setMessages] = useState<DirectMessage[]>(() => getMockDMs(user.id));
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!newMessage.trim()) return;

        const message: DirectMessage = {
            id: `dm-${Date.now()}`,
            content: newMessage.trim(),
            senderId: 'current-user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, message]);
        setNewMessage('');
        inputRef.current?.focus();

        // Simulate reply after 1-2 seconds
        setTimeout(() => {
            const replies = [
                "That's awesome! 😊",
                "Sounds great!",
                "Let's definitely meet up!",
                "I'd love to!",
                "Cool, see you there! 🎉",
            ];
            const reply: DirectMessage = {
                id: `dm-reply-${Date.now()}`,
                content: replies[Math.floor(Math.random() * replies.length)],
                senderId: user.id,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, reply]);
        }, 1000 + Math.random() * 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <button className={styles.backBtn} onClick={onClose}>
                    <ChevronLeft size={24} />
                </button>
                <div className={styles.userInfo}>
                    <img src={user.avatar} alt={user.name} className={styles.avatar} />
                    <div className={styles.userText}>
                        <span className={styles.userName}>{user.name}</span>
                        <span className={styles.userStatus}>
                            {user.status === 'online' ? 'Active now' : 'Last seen recently'}
                        </span>
                    </div>
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.headerBtn}>
                        <Phone size={20} />
                    </button>
                    <button className={styles.headerBtn}>
                        <Video size={20} />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className={styles.messagesContainer}>
                {/* User intro */}
                <div className={styles.userIntro}>
                    <img src={user.avatar} alt={user.name} className={styles.introAvatar} />
                    <h3 className={styles.introName}>{user.name}</h3>
                    <p className={styles.introText}>
                        {user.activity || 'Say hi to start the conversation!'}
                    </p>
                </div>

                {messages.map((msg, i) => {
                    const isOwn = msg.senderId === 'current-user';
                    const showTime = i === messages.length - 1 ||
                        messages[i + 1]?.senderId !== msg.senderId;

                    return (
                        <div key={msg.id} className={`${styles.message} ${isOwn ? styles.messageOwn : ''}`}>
                            {!isOwn && (
                                <img src={user.avatar} alt={user.name} className={styles.messageAvatar} />
                            )}
                            <div className={styles.messageContent}>
                                <div className={styles.messageBubble}>
                                    {msg.content}
                                </div>
                                {showTime && (
                                    <span className={styles.messageTime}>{formatTime(msg.timestamp)}</span>
                                )}
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={styles.inputContainer}>
                <button className={styles.emojiBtn}>
                    <Smile size={24} />
                </button>
                <input
                    ref={inputRef}
                    type="text"
                    className={styles.input}
                    placeholder="Message..."
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button
                    className={`${styles.sendBtn} ${newMessage.trim() ? styles.sendBtnActive : ''}`}
                    onClick={handleSend}
                    disabled={!newMessage.trim()}
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
}
