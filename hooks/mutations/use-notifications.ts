import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NotificationControllerApi } from '@/src/generated/api';
import { getApiConfig } from '@/lib/api-client';

const notificationApi = new NotificationControllerApi(getApiConfig());

export function useMarkAsRead() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (notificationId: number) =>
            notificationApi.markAsRead({ id: notificationId }),
        onSuccess: () => {
            // Invalidate queries to refetch updated data
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        },
    });
}

export function useMarkAllAsRead() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => notificationApi.markAllAsRead(),
        onSuccess: () => {
            // Invalidate queries to refetch updated data
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        },
    });
}
