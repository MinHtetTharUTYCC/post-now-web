import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { NotificationControllerApi, PageNotificationDto } from '@/src/generated/api';
import { getApiConfig } from '@/lib/api-client';

const notificationApi = new NotificationControllerApi(getApiConfig());

export function useNotifications(page = 0, size = 20) {
    return useQuery<PageNotificationDto>({
        queryKey: ['notifications', page, size],
        queryFn: () =>
            notificationApi.getAllNotifications({
                pageable: {
                    page,
                    size,
                    sort: ['createdAt,desc'],
                },
            }),
    });
}

export function useInfiniteNotifications(size = 20) {
    return useInfiniteQuery<PageNotificationDto>({
        queryKey: ['notifications', 'infinite'],
        queryFn: ({ pageParam = 0 }) =>
            notificationApi.getAllNotifications({
                pageable: {
                    page: pageParam as number,
                    size,
                    sort: ['createdAt,desc'],
                },
            }),
        getNextPageParam: (lastPage) => {
            if (lastPage.last === true) return undefined;
            if (lastPage.number !== undefined && lastPage.totalPages !== undefined) {
                if (lastPage.number + 1 >= lastPage.totalPages) return undefined;
                return lastPage.number + 1;
            }
            return undefined;
        },
        initialPageParam: 0,
    });
}

export function useUnreadNotifications(page = 0, size = 20) {
    return useQuery<PageNotificationDto>({
        queryKey: ['notifications', 'unread', page, size],
        queryFn: () =>
            notificationApi.getUnreadNotifications({
                pageable: {
                    page,
                    size,
                    sort: ['createdAt,desc'],
                },
            }),
    });
}

export function useUnreadCount() {
    return useQuery({
        queryKey: ['notifications', 'unread-count'],
        queryFn: async () => {
            const result = await notificationApi.getUnreadCount();
            return { count: result.count || 0 };
        },
        refetchInterval: 30000, // Refetch every 30 seconds
    });
}
