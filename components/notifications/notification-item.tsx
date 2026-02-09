'use client';

import { NotificationDto } from '@/src/generated/api';
import { Heart, MessageCircle, UserPlus, FileText } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import Link from 'next/link';
import { useMarkAsRead } from '@/hooks/mutations/use-notifications';
import { formatDistanceToNow } from 'date-fns';

interface NotificationItemProps {
    notification: NotificationDto;
}

export function NotificationItem({ notification }: NotificationItemProps) {
    const markAsReadMutation = useMarkAsRead();

    const handleClick = () => {
        if (!notification.read && notification.id) {
            markAsReadMutation.mutate(notification.id);
        }
    };

    const getIcon = () => {
        switch (notification.type) {
            case 'NEW_LIKE':
                return <Heart size={20} className="text-red-500" />;
            case 'NEW_COMMENT':
                return <MessageCircle size={20} className="text-blue-500" />;
            case 'NEW_FOLLOW':
                return <UserPlus size={20} className="text-green-500" />;
            case 'NEW_POST':
                return <FileText size={20} className="text-purple-500" />;
            default:
                return null;
        }
    };

    const getHref = () => {
        if (notification.postId) {
            return `/posts/${notification.postId}`;
        }
        if (notification.actor?.username) {
            return `/profile/${notification.actor.username}`;
        }
        return '#';
    };

    return (
        <Link
            href={getHref()}
            onClick={handleClick}
            className={`block p-4 border-b border-gray-700 hover:bg-gray-900 transition ${
                !notification.read ? 'bg-gray-900/50' : ''
            }`}
        >
            <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="mt-1">{getIcon()}</div>

                {/* Avatar */}
                <Avatar
                    src={notification.actor?.profileImage}
                    alt={notification.actor?.username || 'User'}
                    size="md"
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <p className="text-sm">
                        <span className="font-semibold">
                            {notification.actor?.username || 'Someone'}
                        </span>{' '}
                        <span className="text-gray-400">{notification.message}</span>
                    </p>
                    {notification.createdAt && (
                        <p className="text-xs text-gray-500 mt-1">
                            {formatDistanceToNow(new Date(notification.createdAt), {
                                addSuffix: true,
                            })}
                        </p>
                    )}
                </div>

                {/* Unread Indicator */}
                {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />}
            </div>
        </Link>
    );
}
