'use client';

import { useState } from 'react';
import { useNotifications } from '@/hooks/queries/use-notifications';
import { useMarkAllAsRead } from '@/hooks/mutations/use-notifications';
import { NotificationsList } from '@/components/notifications/notifications-list';
import { CheckCheck } from 'lucide-react';

export default function NotificationsPage() {
    const [page, setPage] = useState(0);
    const { data, isLoading, error } = useNotifications(page, 20);
    const markAllAsReadMutation = useMarkAllAsRead();

    const notifications = data?.content || [];
    const hasMore = !data?.last || false;

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };

    const handleMarkAllAsRead = () => {
        markAllAsReadMutation.mutate();
    };

    if (error) {
        return (
            <div className="max-w-2xl mx-auto border-x border-gray-700 min-h-screen">
                <div className="p-6 text-center text-red-500">
                    Failed to load notifications. Please try again.
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto border-x border-gray-700 min-h-screen">
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-gray-700 backdrop-blur bg-black/80 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold">Notifications</h1>
                    {notifications.length > 0 && (
                        <button
                            onClick={handleMarkAllAsRead}
                            disabled={markAllAsReadMutation.isPending}
                            className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-700 hover:bg-gray-900 transition disabled:opacity-50"
                        >
                            <CheckCheck size={16} />
                            Mark all as read
                        </button>
                    )}
                </div>
            </div>

            {/* Notifications List */}
            <NotificationsList
                notifications={notifications}
                isLoading={isLoading}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
                isLoadingMore={false}
            />
        </div>
    );
}
