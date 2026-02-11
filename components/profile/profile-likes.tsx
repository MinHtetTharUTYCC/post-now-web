'use client';

import { useInfiniteUserLikes } from '@/hooks/queries/use-user';
import { PostCard } from '@/components/posts/post-card';
import { useEffect, useRef } from 'react';

interface ProfileLikesProps {
    username: string;
}

export function ProfileLikes({ username }: ProfileLikesProps) {
    const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteUserLikes(username, 10);

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
                <p className="text-lg text-red-500">Failed to load liked posts</p>
            </div>
        );
    }

    const allLikes = data?.pages.flatMap((page) => page.content ?? []) ?? [];

    const uniqueLikes = allLikes.filter(
        (like, index, self) => index === self.findIndex((l) => l.id === like.id),
    );

    // Extract posts from likes, filtering out any undefined posts
    const likedPosts = uniqueLikes
        .map((like) => like.post)
        .filter((post): post is NonNullable<typeof post> => post !== undefined);

    if (!isLoading && likedPosts.length === 0) {
        return (
            <div className="py-12 text-center text-gray-400">
                <p className="text-lg">No likes yet</p>
                <p className="text-sm mt-2">Liked posts from @{username} will appear here</p>
            </div>
        );
    }

    return (
        <div>
            <div className="divide-y divide-gray-700">
                {likedPosts.map((post) => (
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

            {!hasNextPage && likedPosts.length > 0 && (
                <div className="py-8">
                    <p className="text-center text-gray-400">No more liked posts to load</p>
                </div>
            )}
        </div>
    );
}
