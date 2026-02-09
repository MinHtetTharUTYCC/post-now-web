'use client';

import type { PostDto } from '@/src/generated/api/models';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Avatar } from '@/components/ui/avatar';

interface PostCardProps {
    post: PostDto;
}

export function PostCard({ post }: PostCardProps) {
    const router = useRouter();
    return (
        <article
            className="border border-gray-700 p-6 hover:bg-gray-900/50 transition cursor-pointer"
            onClick={() => router.push(`/posts/${post.id}`)}
            onMouseEnter={() => router.prefetch(`/posts/${post.id}`)}
        >
            <div className="flex items-start justify-between">
                <div className="flex gap-3 flex-1">
                    {post.author && (
                        <>
                            <Avatar
                                src={post.author.profileImage}
                                alt={post.author.username}
                                size="sm"
                            />
                            <div>
                                <Link
                                    href={`/profile/${post.author.username}`}
                                    className="text-sm font-semibold hover:underline"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {post.author.firstName} {post.author.lastName}
                                </Link>
                                <p className="text-xs text-gray-500">@{post.author.username}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <Link href={`/posts/${post.id}`} className="block mt-3">
                <h2 className="text-xl font-bold hover:text-gray-300 transition">{post.title}</h2>
                <p className="mt-2 text-gray-300 line-clamp-3">{post.content}</p>
            </Link>

            {/* Image */}
            {post.imageUrl && (
                <div className="mt-3 -mx-2">
                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-auto rounded border border-gray-700 hover:opacity-90 transition"
                    />
                </div>
            )}

            <div className="flex gap-8 mt-4 text-gray-500 text-sm">
                <button className="flex items-center gap-2 hover:text-blue-500 transition group">
                    <MessageCircle
                        size={16}
                        className="group-hover:bg-blue-500/20 rounded-full p-2 w-8 h-8"
                    />
                    <span>{post.commentsCount || 0}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-red-500 transition group">
                    <Heart
                        size={16}
                        className="group-hover:bg-red-500/20 rounded-full p-2 w-8 h-8"
                    />
                    <span>{post.likesCount || 0}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-blue-400 transition group">
                    <Share2
                        size={16}
                        className="group-hover:bg-blue-500/20 rounded-full p-2 w-8 h-8"
                    />
                </button>
            </div>

            {post.createdAt && (
                <p className="text-xs text-gray-500 mt-3">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                </p>
            )}
        </article>
    );
}
