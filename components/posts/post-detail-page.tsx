'use client';

import { usePostById } from '@/hooks/use-posts';
import { PostDetailHeader, PostDetailContent } from '@/components/posts/post-detail';
import { CommentsList } from '@/components/comments/comments-list';
import { useParams } from 'next/navigation';

export function PostDetailPage() {
    const params = useParams();
    const postId = Number(params.id);
    const { data: post, isLoading, error } = usePostById(postId);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black text-white">
                <div className="max-w-2xl mx-auto border-x border-gray-700">
                    <div className="p-6 animate-pulse">
                        <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen bg-black text-white">
                <div className="max-w-2xl mx-auto border-x border-gray-700">
                    <div className="p-12 text-center">
                        <h2 className="text-2xl font-bold mb-2">Post not found</h2>
                        <p className="text-gray-400">This post may have been deleted.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-2xl mx-auto border-x border-gray-700">
                <PostDetailHeader post={post} />
                <PostDetailContent post={post} />
                <CommentsList postId={postId} />
            </div>
        </div>
    );
}
