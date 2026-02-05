'use client';

import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { NearbyGroup } from '@/lib/mockData';
import styles from './CreateGroupModal.module.css';

interface CreateGroupModalProps {
    onClose: () => void;
    onCreate: (group: Omit<NearbyGroup, 'id' | 'members' | 'lat' | 'lng'> & { latOffset: number; lngOffset: number }) => void;
}

const categoryOptions: { value: NearbyGroup['category']; label: string; emoji: string }[] = [
    { value: 'party', label: 'Party', emoji: '🎉' },
    { value: 'food', label: 'Food & Drinks', emoji: '🍕' },
    { value: 'adventure', label: 'Adventure', emoji: '🥾' },
    { value: 'culture', label: 'Culture', emoji: '🏛️' },
    { value: 'relaxation', label: 'Relaxation', emoji: '🧘' },
];

const emojiOptions = ['🎉', '🍕', '🍷', '🌅', '🏖️', '🎭', '🎵', '🏃', '🧘', '🎨', '📸', '🛍️', '☕', '🍻', '💃', '🎰', '🏄', '⛷️', '🎪', '🌃'];

export default function CreateGroupModal({ onClose, onCreate }: CreateGroupModalProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [emoji, setEmoji] = useState('🎉');
    const [category, setCategory] = useState<NearbyGroup['category']>('party');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsCreating(true);

        // Simulate creation delay
        setTimeout(() => {
            onCreate({
                name: name.trim(),
                description: description.trim(),
                emoji,
                category,
                memberCount: 1, // Creator is the first member
                latOffset: (Math.random() - 0.5) * 0.02,
                lngOffset: (Math.random() - 0.5) * 0.02,
            });
            setIsCreating(false);
        }, 600);
    };

    const isValid = name.trim().length > 0;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        <Sparkles size={24} />
                        Create a Group
                    </h2>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* Emoji Selector */}
                    <div className={styles.emojiSection}>
                        <button
                            type="button"
                            className={styles.emojiDisplay}
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        >
                            <span className={styles.selectedEmoji}>{emoji}</span>
                            <span className={styles.emojiLabel}>Tap to change</span>
                        </button>

                        {showEmojiPicker && (
                            <div className={styles.emojiPicker}>
                                {emojiOptions.map(e => (
                                    <button
                                        key={e}
                                        type="button"
                                        className={`${styles.emojiOption} ${emoji === e ? styles.emojiOptionSelected : ''}`}
                                        onClick={() => {
                                            setEmoji(e);
                                            setShowEmojiPicker(false);
                                        }}
                                    >
                                        {e}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Name Input */}
                    <div className={styles.field}>
                        <label className={styles.label}>Group Name *</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="e.g., Sunset drinks at the beach"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            maxLength={50}
                            autoFocus
                        />
                        <span className={styles.charCount}>{name.length}/50</span>
                    </div>

                    {/* Description Input */}
                    <div className={styles.field}>
                        <label className={styles.label}>Description</label>
                        <textarea
                            className={styles.textarea}
                            placeholder="What's the plan? Share details..."
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            maxLength={200}
                            rows={3}
                        />
                        <span className={styles.charCount}>{description.length}/200</span>
                    </div>

                    {/* Category Selection */}
                    <div className={styles.field}>
                        <label className={styles.label}>Category</label>
                        <div className={styles.categoryGrid}>
                            {categoryOptions.map(cat => (
                                <button
                                    key={cat.value}
                                    type="button"
                                    className={`${styles.categoryBtn} ${category === cat.value ? styles.categoryBtnSelected : ''}`}
                                    onClick={() => setCategory(cat.value)}
                                >
                                    <span className={styles.categoryEmoji}>{cat.emoji}</span>
                                    <span>{cat.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={!isValid || isCreating}
                    >
                        {isCreating ? (
                            <>
                                <span className={styles.spinner}></span>
                                Creating...
                            </>
                        ) : (
                            <>
                                <Sparkles size={18} />
                                Create Group
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
