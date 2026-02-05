// Chat types and mock data for group chat feature

export interface ChatMessage {
    id: string;
    groupId: string;
    userId: string;
    userName: string;
    userAvatar: string;
    content: string;
    timestamp: Date;
    reactions: Reaction[];
    type: 'text' | 'image' | 'gif' | 'announcement';
    imageUrl?: string;
}

export interface Reaction {
    emoji: string;
    count: number;
    users: string[]; // user IDs who reacted
}

// Emoji reactions available
export const availableReactions = ['❤️', '🔥', '😂', '🎉', '👏', '😍'];

// Mock current user
export const currentUser = {
    id: 'current-user',
    name: 'You',
    avatar: 'https://i.pravatar.cc/150?img=68',
};

// Generate mock messages for each group
export function getMockMessages(groupId: string): ChatMessage[] {
    const baseMessages: Omit<ChatMessage, 'id' | 'groupId'>[] = [
        {
            userId: 'user-1',
            userName: 'Sarah M.',
            userAvatar: 'https://i.pravatar.cc/150?img=10',
            content: 'Hey everyone! So excited for tonight! 🎉',
            timestamp: new Date(Date.now() - 3600000 * 2),
            reactions: [{ emoji: '🔥', count: 5, users: ['u1', 'u2', 'u3', 'u4', 'u5'] }],
            type: 'text',
        },
        {
            userId: 'user-2',
            userName: 'Mike T.',
            userAvatar: 'https://i.pravatar.cc/150?img=11',
            content: 'Anyone know what time we should arrive?',
            timestamp: new Date(Date.now() - 3600000 * 1.5),
            reactions: [],
            type: 'text',
        },
        {
            userId: 'user-3',
            userName: 'Emma L.',
            userAvatar: 'https://i.pravatar.cc/150?img=12',
            content: 'I\'d say around 7pm works best! The sunset is at 7:30 ✨',
            timestamp: new Date(Date.now() - 3600000),
            reactions: [
                { emoji: '👏', count: 3, users: ['u1', 'u2', 'u3'] },
                { emoji: '❤️', count: 2, users: ['u4', 'u5'] },
            ],
            type: 'text',
        },
        {
            userId: 'host',
            userName: 'Host',
            userAvatar: 'https://i.pravatar.cc/150?img=13',
            content: '📍 UPDATE: Meeting point is at the main entrance. Look for the blue balloons!',
            timestamp: new Date(Date.now() - 1800000),
            reactions: [{ emoji: '🎉', count: 8, users: ['u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7', 'u8'] }],
            type: 'announcement',
        },
        {
            userId: 'user-4',
            userName: 'James K.',
            userAvatar: 'https://i.pravatar.cc/150?img=14',
            content: 'Perfect! Can\'t wait to meet everyone 🙌',
            timestamp: new Date(Date.now() - 900000),
            reactions: [{ emoji: '😍', count: 2, users: ['u1', 'u2'] }],
            type: 'text',
        },
        {
            userId: 'user-5',
            userName: 'Olivia R.',
            userAvatar: 'https://i.pravatar.cc/150?img=15',
            content: 'Just landed! On my way now 🚕',
            timestamp: new Date(Date.now() - 300000),
            reactions: [
                { emoji: '🔥', count: 4, users: ['u1', 'u2', 'u3', 'u4'] },
                { emoji: '🎉', count: 3, users: ['u5', 'u6', 'u7'] },
            ],
            type: 'text',
        },
    ];

    return baseMessages.map((msg, index) => ({
        ...msg,
        id: `${groupId}-msg-${index}`,
        groupId,
    }));
}

// Format timestamp for display
export function formatMessageTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
}
