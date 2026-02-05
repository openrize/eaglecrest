'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Image, Smile, X, ChevronLeft, MoreHorizontal } from 'lucide-react';
import { NearbyGroup } from '@/lib/mockData';
import { ChatMessage, getMockMessages, formatMessageTime, availableReactions, currentUser } from '@/lib/chatData';
import styles from './GroupChat.module.css';

interface GroupChatProps {
    group: NearbyGroup;
    onClose: () => void;
}

export default function GroupChat({ group, onClose }: GroupChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>(() => getMockMessages(group.id));
    const [newMessage, setNewMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [activeReactionMessage, setActiveReactionMessage] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        const message: ChatMessage = {
            id: `${group.id}-msg-${Date.now()}`,
            groupId: group.id,
            userId: currentUser.id,
            userName: currentUser.name,
            userAvatar: currentUser.avatar,
            content: newMessage,
            timestamp: new Date(),
            reactions: [],
            type: 'text',
        };

        setMessages(prev => [...prev, message]);
        setNewMessage('');
        inputRef.current?.focus();
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleReaction = (messageId: string, emoji: string) => {
        setMessages(prev => prev.map(msg => {
            if (msg.id !== messageId) return msg;

            const existingReaction = msg.reactions.find(r => r.emoji === emoji);
            if (existingReaction) {
                // Toggle off if already reacted
                if (existingReaction.users.includes(currentUser.id)) {
                    const newUsers = existingReaction.users.filter(u => u !== currentUser.id);
                    if (newUsers.length === 0) {
                        return { ...msg, reactions: msg.reactions.filter(r => r.emoji !== emoji) };
                    }
                    return {
                        ...msg,
                        reactions: msg.reactions.map(r =>
                            r.emoji === emoji ? { ...r, count: r.count - 1, users: newUsers } : r
                        ),
                    };
                } else {
                    // Add reaction
                    return {
                        ...msg,
                        reactions: msg.reactions.map(r =>
                            r.emoji === emoji ? { ...r, count: r.count + 1, users: [...r.users, currentUser.id] } : r
                        ),
                    };
                }
            } else {
                // New reaction
                return {
                    ...msg,
                    reactions: [...msg.reactions, { emoji, count: 1, users: [currentUser.id] }],
                };
            }
        }));
        setActiveReactionMessage(null);
    };

    const addEmoji = (emoji: string) => {
        setNewMessage(prev => prev + emoji);
        setShowEmojiPicker(false);
        inputRef.current?.focus();
    };

    return (
        <div className={styles.chatContainer}>
            {/* Header */}
            <div className={styles.header}>
                <button className={styles.backBtn} onClick={onClose}>
                    <ChevronLeft size={24} />
                </button>
                <div className={styles.headerInfo}>
                    <span className={styles.headerEmoji}>{group.emoji}</span>
                    <div className={styles.headerText}>
                        <h2 className={styles.headerTitle}>{group.name}</h2>
                        <span className={styles.headerSubtitle}>{group.memberCount} travelers</span>
                    </div>
                </div>
                <button className={styles.moreBtn}>
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Messages */}
            <div className={styles.messagesContainer}>
                {/* Group info banner */}
                <div className={styles.infoBanner}>
                    <span className={styles.infoBannerEmoji}>{group.emoji}</span>
                    <h3 className={styles.infoBannerTitle}>{group.name}</h3>
                    <p className={styles.infoBannerDesc}>{group.description}</p>
                    <div className={styles.infoBannerMembers}>
                        {group.members.slice(0, 5).map((member, i) => (
                            <img
                                key={member.id}
                                src={member.avatar}
                                alt={member.name}
                                className={styles.infoBannerAvatar}
                                style={{ marginLeft: i > 0 ? '-8px' : 0, zIndex: 5 - i }}
                            />
                        ))}
                        <span className={styles.infoBannerCount}>+{group.memberCount - 5} others</span>
                    </div>
                </div>

                {/* Message list */}
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`${styles.message} ${message.userId === currentUser.id ? styles.messageOwn : ''} ${message.type === 'announcement' ? styles.messageAnnouncement : ''}`}
                    >
                        {message.userId !== currentUser.id && (
                            <img src={message.userAvatar} alt={message.userName} className={styles.messageAvatar} />
                        )}
                        <div className={styles.messageContent}>
                            {message.userId !== currentUser.id && (
                                <span className={styles.messageAuthor}>{message.userName}</span>
                            )}
                            <div
                                className={styles.messageBubble}
                                onDoubleClick={() => setActiveReactionMessage(message.id)}
                            >
                                {message.content}
                            </div>

                            {/* Reactions */}
                            {message.reactions.length > 0 && (
                                <div className={styles.reactions}>
                                    {message.reactions.map(reaction => (
                                        <button
                                            key={reaction.emoji}
                                            className={`${styles.reactionBadge} ${reaction.users.includes(currentUser.id) ? styles.reactionActive : ''}`}
                                            onClick={() => handleReaction(message.id, reaction.emoji)}
                                        >
                                            <span>{reaction.emoji}</span>
                                            <span className={styles.reactionCount}>{reaction.count}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Reaction picker */}
                            {activeReactionMessage === message.id && (
                                <div className={styles.reactionPicker}>
                                    {availableReactions.map(emoji => (
                                        <button
                                            key={emoji}
                                            className={styles.reactionOption}
                                            onClick={() => handleReaction(message.id, emoji)}
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                    <button
                                        className={styles.reactionClose}
                                        onClick={() => setActiveReactionMessage(null)}
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            )}

                            <span className={styles.messageTime}>{formatMessageTime(message.timestamp)}</span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={styles.inputContainer}>
                <div className={styles.inputWrapper}>
                    <button
                        className={styles.inputBtn}
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                        <Smile size={22} />
                    </button>

                    {showEmojiPicker && (
                        <div className={styles.emojiPickerPopup}>
                            {['😀', '😂', '🥳', '🔥', '❤️', '👏', '🎉', '✨', '🙌', '😍', '🤩', '💯'].map(emoji => (
                                <button
                                    key={emoji}
                                    className={styles.emojiOption}
                                    onClick={() => addEmoji(emoji)}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    )}

                    <input
                        ref={inputRef}
                        type="text"
                        className={styles.input}
                        placeholder="Send a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />

                    <button className={styles.inputBtn}>
                        <Image size={22} />
                    </button>
                </div>

                <button
                    className={`${styles.sendBtn} ${newMessage.trim() ? styles.sendBtnActive : ''}`}
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
}
