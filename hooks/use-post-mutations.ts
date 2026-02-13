'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostControllerApi, LikeControllerApi } from '@/src/generated/api/apis';
import { getApiConfig } from '@/lib/api-client';
import type { PostCreateDto, PostDto, PostUpdateDto } from '@/src/generated/api/models';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/hooks/queries/use-user';

interface CreatePostWithImage extends PostCreateDto {
    image?: File;
}

export function useCreatePost() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: currentUser } = useCurrentUser();

    return useMutation({
        mutationFn: async (data: CreatePostWithImage) => {
            const config = getApiConfig();
            const postApi = new PostControllerApi(config);

            // Create the post
            const response = await postApi.createPost1({
                title: data.title,
                content: data.content || '',
                postCreateDto: {
                    title: data.title,
                    content: data.content,
                },
            });

            // Upload image if provided
            if (data.image && response && typeof response === 'object' && 'id' in response) {
                const postId = (response as any).id;
                if (postId) {
                    await postApi.updatePostImage({
                        id: postId,
                        image: data.image,
                    });
                }
            }

            return response;
        },
        onSuccess: (response) => {
            // Remove cached feed data so it must refetch when home page mounts
            // (invalidateQueries alone won't work because refetchOnMount: false)
            queryClient.removeQueries({ queryKey: ['posts', 'infinite'] });

            // Optimistically update current user's posts cache
            if (currentUser?.username && response && typeof response === 'object' && 'id' in response) {
                queryClient.removeQueries({ queryKey: ['user-posts', currentUser.username, 'infinite'] });
            }

            // Invalidate current user (for stats/metadata)
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
            router.push('/');
        },
    });
}

export function useDeletePost() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: currentUser } = useCurrentUser();

    return useMutation({
        mutationFn: async (postId: number) => {
            const config = getApiConfig();
            const postApi = new PostControllerApi(config);
            await postApi.deletePost({ id: postId });
            return postId; // Return the ID for use in onSuccess
        },
        onSuccess: (postId) => {
            // Invalidate home feed posts
            queryClient.invalidateQueries({ queryKey: ['posts'], exact: false });

            // Optimistically remove from current user's posts cache
            if (currentUser?.username) {
                queryClient.setQueryData(
                    ['user-posts', currentUser.username, 'infinite'],
                    (oldData: any) => {
                        if (!oldData?.pages) return oldData;
                        return {
                            ...oldData,
                            pages: oldData.pages.map((page: any) => ({
                                ...page,
                                content: page.content?.filter((p: any) => p.id !== postId) || [],
                            })),
                        };
                    }
                );
            }

            // Invalidate current user (for stats/metadata)
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
            router.push('/');
        },
    });
}

// Helper: update a post's core fields in any infinite query cache
function updatePostFieldsInInfiniteCache(oldData: any, postId: number, fields: Partial<PostDto>): any {
    if (!oldData?.pages) return oldData;
    return {
        ...oldData,
        pages: oldData.pages.map((page: any) => ({
            ...page,
            content: page.content?.map((post: any) => {
                if (post.id === postId) {
                    return { ...post, ...fields };
                }
                if (post.post?.id === postId) {
                    return {
                        ...post,
                        post: { ...post.post, ...fields },
                    };
                }
                return post;
            }) || [],
        })),
    };
}

export function useUpdatePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            postId,
            data,
        }: {
            postId: number;
            data: PostUpdateDto;
        }) => {
            const config = getApiConfig();
            const postApi = new PostControllerApi(config);
            const response = await postApi.updatePost({
                id: postId,
                postUpdateDto: data,
            });
            return { postId, response, data };
        },
        onSuccess: ({ postId, response, data }) => {
            if (response) {
                queryClient.setQueryData(['post', postId], response as PostDto);
            }

            const fields: Partial<PostDto> = response
                ? (response as PostDto)
                : { ...data };

            queryClient.setQueriesData(
                { queryKey: ['posts', 'infinite'], exact: false },
                (oldData: any) => updatePostFieldsInInfiniteCache(oldData, postId, fields),
            );

            queryClient.setQueriesData(
                { queryKey: ['user-posts'], exact: false },
                (oldData: any) => updatePostFieldsInInfiniteCache(oldData, postId, fields),
            );

            queryClient.setQueriesData(
                { queryKey: ['user-likes'], exact: false },
                (oldData: any) => updatePostFieldsInInfiniteCache(oldData, postId, fields),
            );
        },
    });
}

export function useUpdatePostImage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ postId, image }: { postId: number; image: File }) => {
            const config = getApiConfig();
            const postApi = new PostControllerApi(config);
            const response = await postApi.updatePostImage({
                id: postId,
                image: image as unknown as Blob,
            });
            return { postId, response };
        },
        onSuccess: ({ postId, response }) => {
            if (response && typeof response === 'object') {
                queryClient.setQueryData(['post', postId], (oldPost: PostDto | undefined) => {
                    if (!oldPost) return oldPost;
                    return { ...oldPost, ...(response as Partial<PostDto>) };
                });

                queryClient.setQueriesData(
                    { queryKey: ['posts', 'infinite'], exact: false },
                    (oldData: any) => updatePostFieldsInInfiniteCache(oldData, postId, response as Partial<PostDto>),
                );

                queryClient.setQueriesData(
                    { queryKey: ['user-posts'], exact: false },
                    (oldData: any) => updatePostFieldsInInfiniteCache(oldData, postId, response as Partial<PostDto>),
                );
            }
        },
    });
}

export function useDeletePostImage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (postId: number) => {
            const config = getApiConfig();
            const postApi = new PostControllerApi(config);
            await postApi.deletePostImage({ id: postId });
            return postId;
        },
        onSuccess: (postId) => {
            queryClient.setQueryData(['post', postId], (oldPost: PostDto | undefined) => {
                if (!oldPost) return oldPost;
                return { ...oldPost, imageUrl: undefined };
            });

            queryClient.setQueriesData(
                { queryKey: ['posts', 'infinite'], exact: false },
                (oldData: any) => updatePostFieldsInInfiniteCache(oldData, postId, { imageUrl: undefined }),
            );

            queryClient.setQueriesData(
                { queryKey: ['user-posts'], exact: false },
                (oldData: any) => updatePostFieldsInInfiniteCache(oldData, postId, { imageUrl: undefined }),
            );
        },
    });
}

// Helper: update a post's like state in any infinite query cache
function updatePostInInfiniteCache(oldData: any, postId: number, liked: boolean): any {
    if (!oldData?.pages) return oldData;
    return {
        ...oldData,
        pages: oldData.pages.map((page: any) => ({
            ...page,
            content: page.content?.map((post: any) => {
                if (post.id === postId) {
                    return {
                        ...post,
                        likedByCurrentUser: liked,
                        likesCount: Math.max(0, (post.likesCount || 0) + (liked ? 1 : -1)),
                    };
                }
                // Also check nested post inside like objects (user-likes cache)
                if (post.post?.id === postId) {
                    return {
                        ...post,
                        post: {
                            ...post.post,
                            likedByCurrentUser: liked,
                            likesCount: Math.max(0, (post.post.likesCount || 0) + (liked ? 1 : -1)),
                        },
                    };
                }
                return post;
            }) || [],
        })),
    };
}

export function useToggleLike() {
    const queryClient = useQueryClient();
    const { data: currentUser } = useCurrentUser();

    return useMutation({
        mutationFn: async ({ postId, liked }: { postId: number; liked: boolean }) => {
            const config = getApiConfig();
            const likeApi = new LikeControllerApi(config);
            await likeApi.toggleLike({ postId });
            return { postId, liked };
        },
        onMutate: async ({ postId, liked }) => {
            // Cancel any outgoing refetches so they don't overwrite our optimistic update
            await queryClient.cancelQueries({ queryKey: ['posts'] });
            await queryClient.cancelQueries({ queryKey: ['post', postId] });

            const newLiked = !liked;

            // 1. Update single post detail cache
            queryClient.setQueryData(['post', postId], (oldPost: PostDto | undefined) => {
                if (!oldPost) return oldPost;
                return {
                    ...oldPost,
                    likedByCurrentUser: newLiked,
                    likesCount: Math.max(0, (oldPost.likesCount || 0) + (newLiked ? 1 : -1)),
                };
            });

            // 2. Update home feed infinite cache
            queryClient.setQueriesData(
                { queryKey: ['posts', 'infinite'], exact: false },
                (oldData: any) => updatePostInInfiniteCache(oldData, postId, newLiked),
            );

            // 3. Update all user-posts caches (profile posts tabs)
            queryClient.setQueriesData(
                { queryKey: ['user-posts'], exact: false },
                (oldData: any) => updatePostInInfiniteCache(oldData, postId, newLiked),
            );

            // 4. Update all user-likes caches (profile likes tabs)
            queryClient.setQueriesData(
                { queryKey: ['user-likes'], exact: false },
                (oldData: any) => updatePostInInfiniteCache(oldData, postId, newLiked),
            );
        },
        onError: (_error, { postId, liked }) => {
            // Revert optimistic update on error - restore original state
            queryClient.setQueryData(['post', postId], (oldPost: PostDto | undefined) => {
                if (!oldPost) return oldPost;
                return {
                    ...oldPost,
                    likedByCurrentUser: liked,
                    likesCount: Math.max(0, (oldPost.likesCount || 0) + (liked ? 1 : -1)),
                };
            });

            queryClient.setQueriesData(
                { queryKey: ['posts', 'infinite'], exact: false },
                (oldData: any) => updatePostInInfiniteCache(oldData, postId, liked),
            );

            queryClient.setQueriesData(
                { queryKey: ['user-posts'], exact: false },
                (oldData: any) => updatePostInInfiniteCache(oldData, postId, liked),
            );

            queryClient.setQueriesData(
                { queryKey: ['user-likes'], exact: false },
                (oldData: any) => updatePostInInfiniteCache(oldData, postId, liked),
            );
        },
        onSettled: (_data, _error, { postId }) => {
            // Invalidate user-likes to refetch (item may be added/removed from list)
            if (currentUser?.username) {
                queryClient.invalidateQueries({
                    queryKey: ['user-likes', currentUser.username, 'infinite'],
                });
            }
        },
    });
}
