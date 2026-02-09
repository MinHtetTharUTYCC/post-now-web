'use client';

import { NotificationDto } from '@/src/generated/api';
import { NotificationItem } from './notification-item';
import { Loader2 } from 'lucide-react';

interface NotificationsListProps {
    notifications: NotificationDto[];
    isLoading?: boolean;
    hasMore?: boolean;
    onLoadMore?: () => void;
    isLoadingMore?: boolean;
}

export function NotificationsList({
    notifications,
    isLoading,
    hasMore,
    onLoadMore,
    isLoadingMore,
}: NotificationsListProps) {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Loader2 className="animate-spin" size={32} />
            </div>
        );
    }

    if (notifications.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <p>No notifications yet</p>
                <p className="text-sm mt-2">
                    We&apos;ll notify you when someone interacts with your posts
                </p>
            </div>
        );
    }

    return (
        <div>
            {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
            ))}

            {hasMore && (
                <div className="p-4 text-center">
                    <button
                        onClick={onLoadMore}
                        disabled={isLoadingMore}
                        className="px-6 py-2 border border-gray-700 hover:bg-gray-900 transition disabled:opacity-50"
                    >
                        {isLoadingMore ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="animate-spin" size={16} />
                                Loading...
                            </span>
                        ) : (
                            'Load More'
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
