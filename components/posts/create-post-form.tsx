'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreatePost } from '@/hooks/use-post-mutations';
import { X, Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

const createPostSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
    content: z.string().max(5000, 'Content is too long').optional(),
});

type CreatePostFormData = z.infer<typeof createPostSchema>;

export function CreatePostForm() {
    const router = useRouter();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<CreatePostFormData>({
        resolver: zodResolver(createPostSchema),
    });

    const createPostMutation = useCreatePost();
    const content = watch('content', '');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
    };

    const onSubmit = (data: CreatePostFormData) => {
        createPostMutation.mutate({
            ...data,
            image: imageFile || undefined,
        });
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-2xl mx-auto border-x border-gray-700">
                {/* Header */}
                <div className="sticky top-0 z-10 border-b border-gray-700 backdrop-blur bg-black/80 p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center justify-center gap-2">
                        <button
                            onClick={() => router.back()}
                            className="hover:bg-gray-800 rounded-full p-2 transition"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-xl font-bold">Create Post</h2>
                    </div>
                    <button
                        type="submit"
                        disabled={createPostMutation.isPending}
                        className="px-8 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {createPostMutation.isPending ? 'Posting...' : 'Post'}
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6">
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
                        {imagePreview && (
                            <div className="relative">
                                <Image
                                    src={imagePreview}
                                    alt="Preview"
                                    width={800}
                                    height={600}
                                    className="w-full h-auto rounded border border-gray-700"
                                />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 bg-black/70 hover:bg-black rounded-full p-2 transition"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}

                        {/* Image Upload Button */}
                        {!imagePreview && (
                            <div>
                                <label className="inline-flex items-center gap-2 px-4 py-2 border border-gray-700 hover:bg-gray-900 transition cursor-pointer">
                                    <ImageIcon size={20} />
                                    <span>Add Image</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        )}

                        {createPostMutation.error && (
                            <div className="p-3 bg-red-900/20 border border-red-500 text-red-500 text-sm">
                                {createPostMutation.error.message || 'Failed to create post'}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
