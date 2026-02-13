'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { Image as ImageIcon, X } from 'lucide-react';
import { usePostById } from '@/hooks/use-posts';
import { useCurrentUser } from '@/hooks/queries/use-user';
import { useDeletePostImage, useUpdatePost, useUpdatePostImage } from '@/hooks/use-post-mutations';

const editPostSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
    content: z.string().max(5000, 'Content is too long').optional(),
});

type EditPostFormData = z.infer<typeof editPostSchema>;

interface EditPostFormProps {
    postId: number;
}

export function EditPostForm({ postId }: EditPostFormProps) {
    const router = useRouter();
    const { data: post, isLoading, error } = usePostById(postId);
    const { data: currentUser } = useCurrentUser();

    const updatePostMutation = useUpdatePost();
    const updatePostImageMutation = useUpdatePostImage();
    const deletePostImageMutation = useDeletePostImage();

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [removeExistingImage, setRemoveExistingImage] = useState(false);

    const defaultValues = useMemo<EditPostFormData>(
        () => ({
            title: post?.title || '',
            content: post?.content || '',
        }),
        [post?.title, post?.content],
    );

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<EditPostFormData>({
        resolver: zodResolver(editPostSchema),
        defaultValues,
    });

    useEffect(() => {
        if (post) {
            reset({
                title: post.title || '',
                content: post.content || '',
            });
            setRemoveExistingImage(false);
            setImagePreview(null);
            setImageFile(null);
        }
    }, [post, reset]);

    const content = watch('content', '');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setRemoveExistingImage(false);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview(null);
        if (post?.imageUrl) {
            setRemoveExistingImage(true);
        }
    };

    const isAuthor = !!currentUser?.username && currentUser.username === post?.author?.username;

    const onSubmit = async (data: EditPostFormData) => {
        if (!postId) return;

        await updatePostMutation.mutateAsync({
            postId,
            data: {
                title: data.title,
                content: data.content || '',
            },
        });

        if (removeExistingImage && post?.imageUrl) {
            await deletePostImageMutation.mutateAsync(postId);
        }

        if (imageFile) {
            await updatePostImageMutation.mutateAsync({ postId, image: imageFile });
        }

        router.push(`/posts/${postId}`);
    };

    if (isLoading) {
        return (
            <div className="max-w-2xl mx-auto border-x border-gray-700 min-h-screen">
                <div className="p-6 animate-pulse">
                    <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="max-w-2xl mx-auto border-x border-gray-700 min-h-screen">
                <div className="p-12 text-center">
                    <h2 className="text-2xl font-bold mb-2">Post not found</h2>
                    <p className="text-gray-400">This post may have been deleted.</p>
                </div>
            </div>
        );
    }

    if (!isAuthor) {
        return (
            <div className="max-w-2xl mx-auto border-x border-gray-700 min-h-screen">
                <div className="p-12 text-center">
                    <h2 className="text-2xl font-bold mb-2">Access denied</h2>
                    <p className="text-gray-400">You can only edit your own posts.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto border-x border-gray-700 min-h-screen">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Header */}
                <div className="sticky top-0 z-10 border-b border-gray-700 backdrop-blur bg-black/80 p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center justify-center gap-2">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="hover:bg-gray-800 rounded-full p-2 transition"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-xl font-bold">Edit Post</h2>
                    </div>
                    <button
                        type="submit"
                        disabled={updatePostMutation.isPending}
                        className="px-8 py-2 bg-white text-black font-semibold hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {updatePostMutation.isPending ? 'Saving...' : 'Save'}
                    </button>
                </div>

                {/* Form Content */}
                <div className="p-6">
                    <div className="space-y-6">
                        <div>
                            <input
                                {...register('title')}
                                placeholder="Post title"
                                className="w-full bg-transparent text-2xl font-bold placeholder-gray-600 focus:outline-none"
                                autoFocus
                            />
                            {errors.title && (
                                <p className="mt-2 text-sm text-red-500">{errors.title.message}</p>
                            )}
                        </div>

                        <div>
                            <textarea
                                {...register('content')}
                                placeholder="What's on your mind?"
                                rows={8}
                                className="w-full bg-transparent text-lg placeholder-gray-600 focus:outline-none resize-none"
                            />
                            {errors.content && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.content.message}
                                </p>
                            )}
                            <p className="mt-2 text-xs text-gray-500 text-right">
                                {content?.length || 0} / 5000
                            </p>
                        </div>

                        {/* Image Preview */}
                        {(imagePreview || (post.imageUrl && !removeExistingImage)) && (
                            <div className="relative">
                                <Image
                                    src={imagePreview || post.imageUrl || ''}
                                    alt="Preview"
                                    width={800}
                                    height={600}
                                    className="w-full h-auto rounded border border-gray-700"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute top-2 right-2 bg-black/70 hover:bg-black rounded-full p-2 transition"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}

                        {/* Image Upload Button */}
                        {!imagePreview && (!post.imageUrl || removeExistingImage) && (
                            <div>
                                <label className="inline-flex items-center gap-2 px-4 py-2 border border-gray-700 hover:bg-gray-900 transition cursor-pointer">
                                    <ImageIcon size={20} />
                                    <span>{post.imageUrl ? 'Replace Image' : 'Add Image'}</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        )}

                        {(updatePostMutation.error || updatePostImageMutation.error) && (
                            <div className="p-3 bg-red-900/20 border border-red-500 text-red-500 text-sm">
                                Failed to update post. Please try again.
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
