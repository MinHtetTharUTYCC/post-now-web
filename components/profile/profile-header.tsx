'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFollowUser, useUnfollowUser } from '@/hooks/mutations/use-follow';
import { useFollowStats, useUserProfile, useCurrentUser } from '@/hooks/queries/use-user';
import { CalendarDays, Settings } from 'lucide-react';
import { useState } from 'react';
import { EditProfileDialog } from './edit-profile-dialog';
import { FollowersDialog } from './followers-dialog';
import { FollowingDialog } from './following-dialog';

interface ProfileHeaderProps {
    username: string;
}

export function ProfileHeader({ username }: ProfileHeaderProps) {
    const { data: user, isLoading } = useUserProfile(username);
    const { data: currentUser } = useCurrentUser();
    const { data: followStats } = useFollowStats(username);
    const followMutation = useFollowUser();
    const unfollowMutation = useUnfollowUser();
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [followersDialogOpen, setFollowersDialogOpen] = useState(false);
    const [followingDialogOpen, setFollowingDialogOpen] = useState(false);

    if (isLoading || !user) {
        return (
            <div className="border-b border-gray-700 p-6">
                <div className="animate-pulse">
                    <div className="h-24 w-24 rounded-full bg-gray-800" />
                    <div className="mt-4 h-4 w-32 bg-gray-800 rounded" />
                    <div className="mt-2 h-4 w-48 bg-gray-800 rounded" />
                </div>
            </div>
        );
    }

    const isOwnProfile = currentUser?.username === username;
    const isFollowing = followStats?.isFollowing || false;
    const followersCount = followStats?.followersCount || 0;
    const followingCount = followStats?.followingCount || 0;

    const handleFollowToggle = async () => {
        if (isFollowing) {
            await unfollowMutation.mutateAsync(username);
        } else {
            await followMutation.mutateAsync(username);
        }
    };

    const getInitials = () => {
        if (user.firstName && user.lastName) {
            return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
        }
        return user.username?.[0]?.toUpperCase() || 'U';
    };

    return (
        <>
            <div className="border-b border-gray-700 p-6 bg-black">
                <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user.profileImage} alt={user.username} />
                            <AvatarFallback className="text-2xl">{getInitials()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold">
                                    {user.firstName || user.lastName
                                        ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
                                        : user.username}
                                </h1>
                                {user.role && user.role !== 'USER' && (
                                    <Badge variant="secondary">{user.role}</Badge>
                                )}
                            </div>
                            <p className="text-muted-foreground">@{user.username}</p>
                            {user.bio && <p className="mt-3 text-sm">{user.bio}</p>}

                            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                                {user.createdAt && (
                                    <div className="flex items-center gap-1">
                                        <CalendarDays className="h-4 w-4" />
                                        <span>
                                            Joined{' '}
                                            {new Date(user.createdAt).toLocaleDateString('en-US', {
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 flex gap-4">
                                <button
                                    onClick={() => setFollowersDialogOpen(true)}
                                    className="hover:underline"
                                >
                                    <span className="font-semibold">{followersCount}</span>{' '}
                                    <span className="text-muted-foreground">Followers</span>
                                </button>
                                <button
                                    onClick={() => setFollowingDialogOpen(true)}
                                    className="hover:underline"
                                >
                                    <span className="font-semibold">{followingCount}</span>{' '}
                                    <span className="text-muted-foreground">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        {isOwnProfile ? (
                            <button
                                onClick={() => setEditDialogOpen(true)}
                                className="px-4 py-2 border border-gray-700 hover:bg-gray-800 font-semibold transition flex items-center gap-2"
                            >
                                <Settings className="h-4 w-4" />
                                Edit Profile
                            </button>
                        ) : (
                            <button
                                onClick={handleFollowToggle}
                                disabled={followMutation.isPending || unfollowMutation.isPending}
                                className={`px-6 py-2 rounded-full font-semibold transition disabled:opacity-50 ${
                                    isFollowing
                                        ? 'border border-gray-700 hover:bg-red-900/20 hover:text-red-500 hover:border-red-500'
                                        : 'bg-white text-black hover:bg-gray-200'
                                }`}
                            >
                                {isFollowing ? 'Unfollow' : 'Follow'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {isOwnProfile && (
                <EditProfileDialog
                    open={editDialogOpen}
                    onOpenChange={setEditDialogOpen}
                    user={user}
                />
            )}

            <FollowersDialog
                open={followersDialogOpen}
                onOpenChange={setFollowersDialogOpen}
                username={username}
            />

            <FollowingDialog
                open={followingDialogOpen}
                onOpenChange={setFollowingDialogOpen}
                username={username}
            />
        </>
    );
}
