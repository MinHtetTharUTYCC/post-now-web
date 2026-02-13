'use client';

import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { CommentControllerApi } from '@/src/generated/api/apis';
import { getApiConfig } from '@/lib/api-client';
import type { CommentCreateDto, Pageable } from '@/src/generated/api/models';
import { useCurrentUser } from '@/hooks/queries/use-user';

// Helper to update commentsCount in cached post data across all queries
function updatePostCommentCount(queryClient: ReturnType<typeof useQueryClient>, postId: number, delta: number) {
    // Update post detail cache
    queryClient.setQueryData(['post', postId], (old: any) => {
        if (!old) return old;
        return { ...old, commentsCount: (old.commentsCount || 0) + delta };
    });

    // Update infinite feed caches (home feed, profile posts)
    const updateInfiniteCache = (old: any) => {
        if (!old?.pages) return old;
        return {
            ...old,
            pages: old.pages.map((page: any) => ({
                ...page,
                content: page.content?.map((post: any) =>
                    post.id === postId
                        ? { ...post, commentsCount: (post.commentsCount || 0) + delta }
                        : post
                ),
            })),
        };
    };

    // Update all infinite query caches that might contain this post
    queryClient.setQueriesData({ queryKey: ['posts', 'infinite'] }, updateInfiniteCache);
    queryClient.setQueriesData({ queryKey: ['user-posts'] }, updateInfiniteCache);
}

export function useComments(postId: number, page: number = 0, size: number = 20) {
    const pageable: Pageable = {
        page,
        size,
        sort: ['createdAt,desc'],
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

export function useInfiniteComments(postId: number, size: number = 20) {
    return useInfiniteQuery({
        queryKey: ['comments', postId, 'infinite'],
        queryFn: async ({ pageParam }) => {
            const config = getApiConfig();
            const commentApi = new CommentControllerApi(config);
            const response = await commentApi.getCommentsByPostId({
                postId,
                pageable: {
                    page: pageParam,
                    size,
                    sort: ['createdAt,desc'],
                },
            });
            return response;
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
        enabled: postId > 0,
    });
}

export function useCreateComment(postId: number) {
    const queryClient = useQueryClient();
    const { data: currentUser } = useCurrentUser();

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
        onSuccess: (response) => {
            // Refetch comments list only
            queryClient.invalidateQueries({ queryKey: ['comments', postId] });

            // Optimistically update current user's comments cache
            if (currentUser?.username && response) {
                queryClient.setQueryData(
                    ['user-comments', currentUser.username, 'infinite'],
                    (oldData: any) => {
                        if (!oldData?.pages) return oldData;
                        return {
                            ...oldData,
                            pages: [
                                {
                                    ...oldData.pages[0],
                                    content: [response, ...(oldData.pages[0]?.content || [])],
                                },
                                ...oldData.pages.slice(1),
                            ],
                        };
                    }
                );
            }

            // Directly update commentsCount in all cached posts (no refetch)
            updatePostCommentCount(queryClient, postId, 1);
        },
    });
}

export function useDeleteComment() {
    const queryClient = useQueryClient();
    const { data: currentUser } = useCurrentUser();

    return useMutation({
        mutationFn: async ({ commentId, postId }: { commentId: number; postId: number }) => {
            const config = getApiConfig();
            const commentApi = new CommentControllerApi(config);
            await commentApi.deleteComment({ commentId });
            return { commentId, postId }; // Return both for use in onSuccess
        },
        onSuccess: ({ commentId, postId }) => {
            // Refetch comments list only
            queryClient.invalidateQueries({ queryKey: ['comments', postId] });

            // Optimistically remove from current user's comments cache
            if (currentUser?.username) {
                queryClient.setQueryData(
                    ['user-comments', currentUser.username, 'infinite'],
                    (oldData: any) => {
                        if (!oldData?.pages) return oldData;
                        return {
                            ...oldData,
                            pages: oldData.pages.map((page: any) => ({
                                ...page,
                                content: page.content?.filter((c: any) => c.id !== commentId) || [],
                            })),
                        };
                    }
                );
            }

            // Directly update commentsCount in all cached posts (no refetch)
            updatePostCommentCount(queryClient, postId, -1);
        },
    });
}
