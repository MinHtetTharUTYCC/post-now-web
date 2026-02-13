'use client';

import { useInfiniteComments } from '@/hooks/use-comments';
import { CommentItem } from './comment-item';
import { CommentForm } from './comment-form';
import Link from 'next/link';
import { useAuthStore } from '@/hooks/stores/use-auth-store';

interface CommentsListProps {
    postId: number;
}

export function CommentsList({ postId }: CommentsListProps) {
    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteComments(postId, 20);
    const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated());

    const allComments = data?.pages.flatMap((page) => page.content ?? []) ?? [];

    return (
        <div>
            {/* Comment Form */}
            {isAuthenticated ? (
                <CommentForm postId={postId} />
            ) : (
                <div className="border-b border-gray-700 p-6 text-center bg-gray-900/30">
                    <p className="text-gray-400 mb-3">Sign in to reply</p>
                    <Link
                        href="/signin"
                        className="inline-block px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition"
                    >
                        Sign In
                    </Link>
                </div>
            )}

            {/* Comments List */}
            {isLoading && (
                <div className="space-y-0">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="p-4 border-b border-gray-700 animate-pulse">
                            <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
                            <div className="h-3 bg-gray-700 rounded w-full mb-1"></div>
                            <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            )}

            {error && <div className="p-6 text-center text-red-500">Failed to load comments</div>}

            {!isLoading && !error && allComments.length > 0 && (
                <div>
                    {allComments.map((comment) => (
                        <CommentItem key={comment.id} comment={comment} />
                    ))}
                </div>
            )}

            {!isLoading && !error && allComments.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                    No comments yet. Be the first to reply!
                </div>
            )}

            {hasNextPage && (
                <div className="p-4 text-center">
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="px-6 py-2 border border-gray-700 hover:bg-gray-900 transition disabled:opacity-50"
                    >
                        {isFetchingNextPage ? 'Loading...' : 'Load More'}
                    </button>
                </div>
            )}
        </div>
    );
}
