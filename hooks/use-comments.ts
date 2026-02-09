'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CommentControllerApi } from '@/src/generated/api/apis';
import { getApiConfig } from '@/lib/api-client';
import type { CommentCreateDto, Pageable } from '@/src/generated/api/models';

export function useComments(postId: number, page: number = 0, size: number = 20) {
    const pageable: Pageable = {
        page,
        size,
        sort: ['createdAt,asc'],
    };

    return useQuery({
        queryKey: ['comments', postId, page, size],
        queryFn: async () => {
            const config = getApiConfig();
            const commentApi = new CommentControllerApi(config);
            const response = await commentApi.getCommentsByPostId({ postId, pageable });
            return response;
        },
        enabled: postId > 0,
    });
}

export function useCreateComment(postId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CommentCreateDto) => {
            const config = getApiConfig();
            const commentApi = new CommentControllerApi(config);
            const response = await commentApi.createComment({
                postId,
                commentCreateDto: data,
            });
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', postId] });
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });
}

export function useDeleteComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (commentId: number) => {
            const config = getApiConfig();
            const commentApi = new CommentControllerApi(config);
            await commentApi.deleteComment({ commentId });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] });
        },
    });
}
