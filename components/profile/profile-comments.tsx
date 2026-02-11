'use client';

import { useInfiniteUserComments } from '@/hooks/queries/use-user';
import { useRef, useEffect } from 'react';
import { CustomAvatar } from '@/components/ui/custom-avatar';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface ProfileCommentsProps {
    username: string;
}

export function ProfileComments({ username }: ProfileCommentsProps) {
    const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteUserComments(username, 10);

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
                <p className="text-lg text-red-500">Failed to load comments</p>
            </div>
        );
    }

    const allComments = data?.pages.flatMap((page) => page.content ?? []) ?? [];

    const uniqueComments = allComments.filter(
        (comment, index, self) => index === self.findIndex((c) => c.id === comment.id),
    );

    if (!isLoading && uniqueComments.length === 0) {
        return (
            <div className="py-12 text-center text-gray-400">
                <p className="text-lg">No comments yet</p>
                <p className="text-sm mt-2">Comments from @{username} will appear here</p>
            </div>
        );
    }

    return (
        <div>
            <div className="divide-y divide-gray-700">
                {uniqueComments.map((comment) => (
                    <Link
                        key={comment.id}
                        href={`/posts/${comment.postId}`}
                        className="block border border-gray-700 p-6 hover:bg-gray-900/50 transition"
                    >
                        <div className="flex gap-3">
                            <CustomAvatar
                                src={comment.author.profileImage}
                                alt={comment.author.username}
                                fallback={comment.author?.username?.[0]?.toUpperCase() || '?'}
                                size="sm"
                            />

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-semibold hover:underline">
                                        {comment.author?.firstName} {comment.author?.lastName}
                                    </span>
                                    <span className="text-gray-400">
                                        @{comment.author?.username}
                                    </span>
                                    <span className="text-gray-500 text-sm">·</span>
                                    <span className="text-gray-500 text-sm">
                                        {comment.createdAt
                                            ? formatDistanceToNow(new Date(comment.createdAt), {
                                                  addSuffix: true,
                                              })
                                            : 'Unknown'}
                                    </span>
                                </div>

                                <div className="mt-3 text-gray-300 wrap-break-word">
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                                        <MessageCircle size={16} />
                                        <span>Commented on a post</span>
                                    </div>
                                    <p>{comment.content}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
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

            {!hasNextPage && uniqueComments.length > 0 && (
                <div className="py-8">
                    <p className="text-center text-gray-400">No more comments to load</p>
                </div>
            )}
        </div>
    );
}
