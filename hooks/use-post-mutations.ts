'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostControllerApi } from '@/src/generated/api/apis';
import { getApiConfig } from '@/lib/api-client';
import type { PostCreateDto } from '@/src/generated/api/models';
import { useRouter } from 'next/navigation';

interface CreatePostWithImage extends PostCreateDto {
    image?: File;
}

export function useCreatePost() {
    const router = useRouter();
    const queryClient = useQueryClient();

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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            router.push('/');
        },
    });
}

export function useDeletePost() {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (postId: number) => {
            const config = getApiConfig();
            const postApi = new PostControllerApi(config);
            await postApi.deletePost({ id: postId });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            router.push('/');
        },
    });
}
