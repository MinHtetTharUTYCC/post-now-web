'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateComment } from '@/hooks/use-comments';

const commentSchema = z.object({
    content: z.string().min(1, 'Comment cannot be empty').max(1000, 'Comment is too long'),
});

type CommentFormData = z.infer<typeof commentSchema>;

interface CommentFormProps {
    postId: number;
}

export function CommentForm({ postId }: CommentFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CommentFormData>({
        resolver: zodResolver(commentSchema),
    });

    const createCommentMutation = useCreateComment(postId);

    const onSubmit = (data: CommentFormData) => {
        createCommentMutation.mutate(data, {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="border-b border-gray-700 p-4">
            <textarea
                {...register('content')}
                placeholder="Post your reply"
                rows={3}
                className="w-full bg-transparent placeholder-gray-600 focus:outline-none resize-none"
            />
            {errors.content && (
                <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>
            )}
            <div className="flex justify-end mt-2">
                <button
                    type="submit"
                    disabled={createCommentMutation.isPending}
                    className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {createCommentMutation.isPending ? 'Replying...' : 'Reply'}
                </button>
            </div>
        </form>
    );
}
