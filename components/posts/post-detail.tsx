'use client';

import type { PostDto } from '@/src/generated/api/models';
import { Heart, MessageCircle, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Avatar } from '@/components/ui/avatar';

interface PostDetailHeaderProps {
    post: PostDto;
}

export function PostDetailHeader({ post }: PostDetailHeaderProps) {
    const router = useRouter();

    return (
        <div className="sticky top-0 z-10 border-b border-gray-700 backdrop-blur bg-black/80 p-4 flex items-center gap-4">
            <button
                onClick={() => router.back()}
                className="hover:bg-gray-800 rounded-full p-2 transition"
            >
                <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-bold">Post</h2>
        </div>
    );
}

export function PostDetailContent({ post }: PostDetailHeaderProps) {
    return (
        <article className="p-6 border-b border-gray-700">
            {/* Author */}
            {post.author && (
                <div className="flex items-start gap-3 mb-4">
                    <Avatar src={post.author.profileImage} alt={post.author.username} size="md" />
                    <Link href={`/profile/${post.author.username}`} className="flex-1">
                        <div className="font-semibold hover:underline">
                            {post.author.firstName} {post.author.lastName}
                        </div>
                        <div className="text-sm text-gray-500">@{post.author.username}</div>
                    </Link>
                </div>
            )}

            {/* Content */}
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">{post.title}</h1>
                {post.content && <p className="text-lg whitespace-pre-wrap">{post.content}</p>}

                {/* Image */}
                {post.imageUrl && (
                    <div className="mt-4">
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-auto rounded border border-gray-700"
                        />
                    </div>
                )}
            </div>

            {/* Timestamp */}
            {post.createdAt && (
                <div className="mt-4 text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                </div>
            )}

            {/* Stats */}
            <div className="flex gap-6 mt-4 pt-4 border-t border-gray-700 text-sm">
                <div>
                    <span className="font-bold">{post.likesCount || 0}</span>{' '}
                    <span className="text-gray-500">Likes</span>
                </div>
                <div>
                    <span className="font-bold">{post.commentsCount || 0}</span>{' '}
                    <span className="text-gray-500">Comments</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-around mt-4 pt-4 border-t border-gray-700">
                <button className="flex items-center gap-2 hover:text-blue-500 transition group">
                    <MessageCircle
                        size={20}
                        className="group-hover:bg-blue-500/20 rounded-full p-2 w-9 h-9"
                    />
                </button>
                <button className="flex items-center gap-2 hover:text-red-500 transition group">
                    <Heart
                        size={20}
                        className="group-hover:bg-red-500/20 rounded-full p-2 w-9 h-9"
                    />
                </button>
                <button className="flex items-center gap-2 hover:text-blue-400 transition group">
                    <Share2
                        size={20}
                        className="group-hover:bg-blue-500/20 rounded-full p-2 w-9 h-9"
                    />
                </button>
            </div>
        </article>
    );
}
