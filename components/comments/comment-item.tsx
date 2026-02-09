'use client';

import type { CommentDto } from '@/src/generated/api/models';
import Link from 'next/link';
import { Avatar } from '@/components/ui/avatar';

interface CommentItemProps {
    comment: CommentDto;
}

export function CommentItem({ comment }: CommentItemProps) {
    return (
        <article className="p-4 border-b border-gray-700 hover:bg-gray-900/30 transition">
            <div className="flex gap-3">
                {comment.author && (
                    <Avatar
                        src={comment.author.profileImage}
                        alt={comment.author.username}
                        size="sm"
                    />
                )}
                <div className="flex-1">
                    {/* Author */}
                    {comment.author && (
                        <div className="flex items-center gap-2 mb-2">
                            <Link
                                href={`/profile/${comment.author.username}`}
                                className="font-semibold hover:underline"
                            >
                                {comment.author.firstName} {comment.author.lastName}
                            </Link>
                            <span className="text-gray-500">@{comment.author.username}</span>
                            {comment.createdAt && (
                                <>
                                    <span className="text-gray-500">·</span>
                                    <span className="text-gray-500 text-sm">
                                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </>
                            )}
                        </div>
                    )}

                    {/* Content */}
                    <p className="text-gray-200 whitespace-pre-wrap">{comment.content}</p>
                </div>
            </div>
        </article>
    );
}
