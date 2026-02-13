'use client';

import type { CommentDto } from '@/src/generated/api/models';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { useDeleteComment } from '@/hooks/use-comments';
import { useCurrentUser } from '@/hooks/queries/use-user';
import { CustomAvatar } from '@/components/ui/custom-avatar';

interface CommentItemProps {
    comment: CommentDto;
}

export function CommentItem({ comment }: CommentItemProps) {
    const { data: currentUser } = useCurrentUser();
    const deleteCommentMutation = useDeleteComment();
    const isAuthor = !!currentUser?.username && currentUser.username === comment.author?.username;

    const handleDelete = () => {
        if (!comment.id || !comment.postId) return;
        if (!window.confirm('Delete this comment?')) return;
        deleteCommentMutation.mutate({ commentId: comment.id, postId: comment.postId });
    };

    return (
        <article className="p-4 border-b border-gray-700 hover:bg-gray-900/30 transition">
            <div className="flex gap-3">
                {comment.author && (
                    <CustomAvatar
                        src={comment.author.profileImage}
                        alt={comment.author.username}
                        fallback={comment.author.username?.[0]?.toUpperCase()}
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
                            {isAuthor && (
                                <button
                                    onClick={handleDelete}
                                    disabled={deleteCommentMutation.isPending}
                                    className="ml-auto inline-flex items-center gap-1 text-red-500 hover:text-red-400 transition disabled:opacity-50"
                                    aria-label="Delete comment"
                                >
                                    <Trash2 size={14} />
                                    Delete
                                </button>
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
