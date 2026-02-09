'use client';

import { usePosts } from '@/hooks/use-posts';
import { PostCard } from './post-card';
import { useState } from 'react';

export function PostsFeed() {
    const [page, setPage] = useState(0);
    const { data, isLoading, error } = usePosts(page, 10);

    if (isLoading && page === 0) {
        return (
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="border border-gray-700 p-6 animate-pulse">
                        <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
                        <div className="h-6 bg-gray-700 rounded w-3/4 mb-3"></div>
                        <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 border border-gray-700 text-center">
                <p className="text-red-500">Failed to load posts</p>
            </div>
        );
    }

    if (!data?.content || data.content.length === 0) {
        return (
            <div className="p-12 text-center border border-gray-700">
                <p className="text-gray-400">No posts yet. Be the first to share!</p>
            </div>
        );
    }

    return (
        <div>
            <div className="space-y-0 border border-gray-700 divide-y divide-gray-700">
                {data.content.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            {/* TODOI: Infinite scroll + maintain postition at route switch */}
            {data.totalPages && data.totalPages > 1 && (
                <div className="flex justify-between items-center gap-4 mt-6">
                    <button
                        onClick={() => setPage(Math.max(0, page - 1))}
                        disabled={page === 0}
                        className="px-4 py-2 border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900 transition"
                    >
                        Previous
                    </button>

                    <span className="text-gray-400">
                        Page {page + 1} of {data.totalPages}
                    </span>

                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page >= (data.totalPages ?? 0) - 1}
                        className="px-4 py-2 border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900 transition"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
