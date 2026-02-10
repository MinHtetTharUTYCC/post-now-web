'use client';

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { postApi } from '@/lib/api-client';
import type { Pageable } from '@/src/generated/api/models';
import { Configuration } from '@/src/generated/api';
import { useAuthStore } from '@/hooks/stores/use-auth-store';

// Helper function to call API with flat query parameters
async function getAllPostsWithFlatParams(page: number, size: number, sort: string[]) {
    const basePath = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090';
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('size', size.toString());
    sort.forEach(s => params.append('sort', s));

    const url = `${basePath}/api/posts?${params.toString()}`;
    console.log('🌐 Full URL:', url);

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

export function usePosts(page: number = 0, size: number = 10) {
    const pageable: Pageable = {
        page,
        size,
        sort: ['createdAt,desc'],
    };

    return useQuery({
        queryKey: ['posts', page, size],
        queryFn: async () => {
            const response = await postApi.getAllPosts({ pageable });
            return response;
        },
        staleTime: 60 * 1000,
    });
}

export function useInfinitePosts(size: number = 10) {
    return useInfiniteQuery({
        queryKey: ['posts', 'infinite', 'v3'],
        queryFn: async ({ pageParam }) => {
            console.log('🔵 Fetching page:', pageParam);
            const response = await getAllPostsWithFlatParams(pageParam, size, ['createdAt,desc']);
            console.log('✅ Received page:', response.number, 'Total pages:', response.totalPages, 'Content count:', response.content?.length);
            console.log('📄 First post ID:', response.content?.[0]?.id);
            return response;
        },
        getNextPageParam: (lastPage) => {
            console.log('🔍 Calculating next page. Current page:', lastPage.number, 'Last?:', lastPage.last);
            // Check if we're on the last page
            if (lastPage.last === true) {
                console.log('❌ No more pages (last=true)');
                return undefined;
            }
            // Check if there are more pages using totalPages
            if (lastPage.number !== undefined && lastPage.totalPages !== undefined) {
                if (lastPage.number + 1 >= lastPage.totalPages) {
                    console.log('❌ No more pages (reached total)');
                    return undefined;
                }
                const nextPage = lastPage.number + 1;
                console.log('➡️  Next page will be:', nextPage);
                return nextPage;
            }
            // Fallback: if we can't determine, stop pagination
            console.log('❌ Cannot determine next page');
            return undefined;
        },
        initialPageParam: 0,
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
}

export function usePostById(id: number) {
    return useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
            const response = await postApi.getPostById({ id });
            return response;
        },
        enabled: id > 0,
        staleTime: 0,
    });
}

export function useSearchPosts(query: string, page: number = 0, size: number = 10) {
    const pageable: Pageable = {
        page,
        size,
        sort: ['createdAt,desc'],
    };

    return useQuery({
        queryKey: ['posts-search', query, page, size],
        queryFn: async () => {
            const response = await postApi.searchPosts({ query, pageable });
            return response;
        },
        enabled: query.length > 0,
        staleTime: 60 * 1000,
    });
}
