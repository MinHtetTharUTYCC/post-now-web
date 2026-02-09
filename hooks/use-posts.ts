'use client';

import { useQuery } from '@tanstack/react-query';
import { postApi } from '@/lib/api-client';
import type { Pageable } from '@/src/generated/api/models';

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

export function usePostById(id: number) {
    return useQuery({
        queryKey: ['posts', id],
        queryFn: async () => {
            const response = await postApi.getPostById({ id });
            return response;
        },
        enabled: id > 0,
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
