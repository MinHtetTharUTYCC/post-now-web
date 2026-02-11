'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostControllerApi } from '@/src/generated/api/apis';
import { getApiConfig } from '@/lib/api-client';
import type { PostCreateDto } from '@/src/generated/api/models';
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
            // Invalidate home feed posts
            queryClient.invalidateQueries({ queryKey: ['posts'], exact: false });

            // Optimistically update current user's posts cache
            if (currentUser?.username && response && typeof response === 'object' && 'id' in response) {
                queryClient.setQueryData(
                    ['user-posts', currentUser.username, 'infinite'],
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
