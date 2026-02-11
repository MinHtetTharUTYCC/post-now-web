'use client';

import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { getAuthenticatedApiClient } from '@/lib/api-client';
import { useAuthStore } from '@/hooks/stores/use-auth-store';

// Helper function for fetching user posts with flat parameters
async function getUserPostsWithFlatParams(username: string, page: number, size: number, sort: string[]) {
    const basePath = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090';
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('size', size.toString());
    sort.forEach(s => params.append('sort', s));

    const url = `${basePath}/api/posts/user/${username}?${params.toString()}`;
    console.log('🌐 User Posts URL:', url);

    const token = useAuthStore.getState().token;
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        method: 'GET',
        headers,
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return response.json();
}

export function useUserProfile(username: string) {
    return useQuery({
        queryKey: ['user', username],
        queryFn: async () => {
            const client = getAuthenticatedApiClient();
            const response = await client.user.getUserByUsername({ username });
            return response;
        },
        enabled: !!username,
    });
}

export function useCurrentUser() {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const client = getAuthenticatedApiClient();
            const response = await client.user.getCurrentUser();
            return response;
        },
    });
}

export function useUserPosts(username: string, page: number = 0, size: number = 10) {
    return useQuery({
        queryKey: ['user-posts', username, page, size],
        queryFn: async () => {
            const client = getAuthenticatedApiClient();
            const response = await client.post.getPostsByAuthorRaw({
                username,
                pageable: { page, size, sort: ['createdAt,desc'] },
            });
            return response.value();
        },
        enabled: !!username,
    });
}

export function useInfiniteUserPosts(username: string, size: number = 10) {
    return useInfiniteQuery({
        queryKey: ['user-posts', username, 'infinite'],
        queryFn: async ({ pageParam }) => {
            console.log('🔵 Fetching user posts page:', pageParam, 'for', username);
            const response = await getUserPostsWithFlatParams(username, pageParam, size, ['createdAt,desc']);
            console.log('✅ Received page:', response.number, 'Content count:', response.content?.length);
            return response;
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.last === true) {
                return undefined;
            }
            if (lastPage.number !== undefined && lastPage.totalPages !== undefined) {
                if (lastPage.number + 1 >= lastPage.totalPages) {
                    return undefined;
                }
                return lastPage.number + 1;
            }
            return undefined;
        },
        initialPageParam: 0,
        enabled: !!username,
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
}

export function useFollowStats(username: string) {
    return useQuery({
        queryKey: ['follow-stats', username],
        queryFn: async () => {
            const client = getAuthenticatedApiClient();
            const response = await client.follow.getFollowStats({ username });
            return response as unknown as { followersCount: number; followingCount: number; isFollowing: boolean };
        },
        enabled: !!username,
    });
}

export function useFollowers(username: string, page: number = 0, size: number = 20) {
    return useQuery({
        queryKey: ['followers', username, page],
        queryFn: async () => {
            const client = getAuthenticatedApiClient();
            const response = await client.follow.getFollowers({
                username,
                pageable: { page, size },
            });
            return response;
        },
        enabled: !!username,
    });
}

export function useFollowing(username: string, page: number = 0, size: number = 20) {
    return useQuery({
        queryKey: ['following', username, page],
        queryFn: async () => {
            const client = getAuthenticatedApiClient();
            const response = await client.follow.getFollowing({
                username,
                pageable: { page, size },
            });
            return response;
        },
        enabled: !!username,
    });
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: {
            email?: string;
            firstName?: string;
            lastName?: string;
            bio?: string;
        }) => {
            const client = getAuthenticatedApiClient();
            const response = await client.user.updateCurrentUser({
                userUpdateDto: data,
            });
            return response;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
            queryClient.invalidateQueries({ queryKey: ['user', data.username] });
        },
    });
}

export function useUploadProfileImage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (image: File) => {
            const client = getAuthenticatedApiClient();

            // Note: Generated client has Content-Type: application/json but backend expects multipart/form-data
            // So we manually use FormData with the correct endpoint: /api/users/me/profile-image
            const formData = new FormData();
            formData.append('image', image);

            const token = useAuthStore.getState().token;
            const basePath = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090';

            const response = await fetch(`${basePath}/api/users/me/profile-image`, {
                method: 'POST',
                headers: token ? { 'Authorization': `Bearer ${token}` } : {},
                body: formData,
                // Don't set Content-Type header - browser will set it with boundary for multipart/form-data
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(`Upload failed: ${response.status} - ${error}`);
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        },
    });
}

export function useDeleteProfileImage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const client = getAuthenticatedApiClient();
            const response = await client.user.deleteProfileImage();
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        },
    });
}

// Helper function for fetching user comments with flat parameters
async function getUserCommentsWithFlatParams(username: string, page: number, size: number, sort: string[]) {
    const basePath = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090';
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('size', size.toString());
    sort.forEach(s => params.append('sort', s));

    const url = `${basePath}/api/comments/user/${username}?${params.toString()}`;

    const token = useAuthStore.getState().token;
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, { method: 'GET', headers });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
}

// Helper function for fetching user likes with flat parameters
async function getUserLikesWithFlatParams(username: string, page: number, size: number, sort: string[]) {
    const basePath = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090';
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('size', size.toString());
    sort.forEach(s => params.append('sort', s));

    const url = `${basePath}/api/likes/user/${username}?${params.toString()}`;

    const token = useAuthStore.getState().token;
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, { method: 'GET', headers });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
}

export function useInfiniteUserComments(username: string, size: number = 10) {
    return useInfiniteQuery({
        queryKey: ['user-comments', username, 'infinite'],
        queryFn: async ({ pageParam }) => {
            return getUserCommentsWithFlatParams(username, pageParam, size, ['createdAt,desc']);
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.last === true) return undefined;
            if (lastPage.number !== undefined && lastPage.totalPages !== undefined) {
                if (lastPage.number + 1 >= lastPage.totalPages) return undefined;
                return lastPage.number + 1;
            }
            return undefined;
        },
        initialPageParam: 0,
        enabled: !!username,
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
}

export function useInfiniteUserLikes(username: string, size: number = 10) {
    return useInfiniteQuery({
        queryKey: ['user-likes', username, 'infinite'],
        queryFn: async ({ pageParam }) => {
            return getUserLikesWithFlatParams(username, pageParam, size, ['createdAt,desc']);
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.last === true) return undefined;
            if (lastPage.number !== undefined && lastPage.totalPages !== undefined) {
                if (lastPage.number + 1 >= lastPage.totalPages) return undefined;
                return lastPage.number + 1;
            }
            return undefined;
        },
        initialPageParam: 0,
        enabled: !!username,
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
}
