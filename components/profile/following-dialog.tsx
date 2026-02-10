'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useFollowing } from '@/hooks/queries/use-user';
import { useFollowUser, useUnfollowUser } from '@/hooks/mutations/use-follow';
import { useCurrentUser } from '@/hooks/queries/use-user';
import { useState } from 'react';
import Link from 'next/link';

interface FollowingDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    username: string;
}

export function FollowingDialog({ open, onOpenChange, username }: FollowingDialogProps) {
    const [page, setPage] = useState(0);
    const { data: followingData, isLoading } = useFollowing(username, page);
    const { data: currentUser } = useCurrentUser();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-125 bg-black border-gray-700 text-white">
                <DialogHeader>
                    <DialogTitle className="text-white">Following</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        People @{username} is following
                    </DialogDescription>
                </DialogHeader>

                <div className="max-h-100 overflow-y-auto">
                    {isLoading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-3 animate-pulse">
                                    <div className="h-12 w-12 rounded-full bg-gray-800" />
                                    <div className="flex-1">
                                        <div className="h-4 w-32 bg-gray-800 rounded" />
                                        <div className="mt-1 h-3 w-24 bg-gray-800 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : followingData?.content && followingData.content.length > 0 ? (
                        <div className="space-y-4">
                            {followingData.content.map((user) => (
                                <FollowingItem
                                    key={user.id}
                                    user={user}
                                    currentUsername={currentUser?.username}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-8 text-center text-gray-400">
                            Not following anyone yet
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

interface FollowingItemProps {
    user: any;
    currentUsername?: string;
}

function FollowingItem({ user, currentUsername }: FollowingItemProps) {
    const followMutation = useFollowUser();
    const unfollowMutation = useUnfollowUser();
    const [isFollowing, setIsFollowing] = useState(true);

    const handleUnfollow = async () => {
        await unfollowMutation.mutateAsync(user.username);
        setIsFollowing(false);
    };

    const handleFollow = async () => {
        await followMutation.mutateAsync(user.username);
        setIsFollowing(true);
    };

    const getInitials = () => {
        if (user.firstName && user.lastName) {
            return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
        }
        return user.username?.[0]?.toUpperCase() || 'U';
    };

    const isOwnProfile = currentUsername === user.username;

    return (
        <div className="flex items-center justify-between gap-3">
            <Link href={`/profile/${user.username}`} className="flex items-center gap-3 flex-1">
                <Avatar>
                    <AvatarImage src={user.profileImage} alt={user.username} />
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate text-white">
                        {user.firstName || user.lastName
                            ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
                            : user.username}
                    </p>
                    <p className="text-sm text-gray-400 truncate">@{user.username}</p>
                </div>
            </Link>
            {!isOwnProfile && (
                <Button
                    size="sm"
                    variant={isFollowing ? 'outline' : 'default'}
                    onClick={isFollowing ? handleUnfollow : handleFollow}
                    disabled={followMutation.isPending || unfollowMutation.isPending}
                >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
            )}
        </div>
    );
}
