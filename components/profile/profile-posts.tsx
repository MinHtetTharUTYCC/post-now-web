'use client';

import { useInfiniteUserPosts } from '@/hooks/queries/use-user';
import { PostCard } from '@/components/posts/post-card';
import { useEffect, useRef } from 'react';

interface ProfilePostsProps {
    username: string;
}

export function ProfilePosts({ username }: ProfilePostsProps) {
    const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteUserPosts(username, 10);

    const loadMoreRef = useRef<HTMLDivElement>(null);
    const fetchingRef = useRef(false);

    useEffect(() => {
        const element = loadMoreRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    hasNextPage &&
                    !isFetchingNextPage &&
                    !fetchingRef.current
                ) {
                    fetchingRef.current = true;
                    fetchNextPage().finally(() => {
                        setTimeout(() => {
                            fetchingRef.current = false;
                        }, 1000);
                    });
                }
            },
            { threshold: 0.1, rootMargin: '100px' },
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="border-b border-gray-700 p-6 animate-pulse">
                        <div className="flex gap-3">
                            <div className="h-12 w-12 rounded-full bg-gray-800" />
                            <div className="flex-1 space-y-3">
                                <div className="h-4 w-32 bg-gray-800 rounded" />
                                <div className="h-4 w-full bg-gray-800 rounded" />
                                <div className="h-4 w-3/4 bg-gray-800 rounded" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-12 text-center">
                <p className="text-lg text-red-500">Failed to load posts</p>
            </div>
        );
    }

    const allPosts = data?.pages.flatMap((page) => page.content ?? []) ?? [];

    const uniquePosts = allPosts.filter(
        (post, index, self) => index === self.findIndex((p) => p.id === post.id),
    );

    if (!isLoading && uniquePosts.length === 0) {
        return (
            <div className="py-12 text-center text-gray-400">
                <p className="text-lg">No posts yet</p>
                <p className="text-sm mt-2">Posts from @{username} will appear here</p>
            </div>
        );
    }

    return (
        <div>
            <div className="divide-y divide-gray-700">
                {uniquePosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            {hasNextPage && (
                <div ref={loadMoreRef} className="py-8">
                    {isFetchingNextPage ? (
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="border-b border-gray-700 p-6 animate-pulse">
                                    <div className="flex gap-3">
                                        <div className="h-12 w-12 rounded-full bg-gray-800" />
                                        <div className="flex-1 space-y-3">
                                            <div className="h-4 w-32 bg-gray-800 rounded" />
                                            <div className="h-4 w-full bg-gray-800 rounded" />
                                            <div className="h-4 w-3/4 bg-gray-800 rounded" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-4">Scroll for more...</div>
                    )}
                </div>
            )}

            {!hasNextPage && uniquePosts.length > 0 && (
                <div className="py-8">
                    <p className="text-center text-gray-400">No more posts to load</p>
                </div>
            )}
        </div>
    );
}
