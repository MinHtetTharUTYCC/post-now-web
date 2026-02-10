'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAuthenticatedApiClient } from '@/lib/api-client';

export function useFollowUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (username: string) => {
            const client = getAuthenticatedApiClient();
            const response = await client.follow.followUser({ username });
            return response;
        },
        onSuccess: (_, username) => {
            queryClient.invalidateQueries({ queryKey: ['follow-stats', username] });
            queryClient.invalidateQueries({ queryKey: ['followers', username] });
        },
    });
}

export function useUnfollowUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (username: string) => {
            const client = getAuthenticatedApiClient();
            const response = await client.follow.unfollowUser({ username });
            return response;
        },
        onSuccess: (_, username) => {
            queryClient.invalidateQueries({ queryKey: ['follow-stats', username] });
            queryClient.invalidateQueries({ queryKey: ['followers', username] });
        },
    });
}
