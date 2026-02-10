'use client';

import { ProfilePage } from '@/components/profile/profile-page';
import { useCurrentUser } from '@/hooks/queries/use-user';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MyProfilePage() {
    const { data: currentUser, isLoading } = useCurrentUser();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && currentUser?.username) {
            router.replace(`/profile/${currentUser.username}`);
        }
    }, [currentUser, isLoading, router]);

    if (isLoading || !currentUser || !currentUser.username) {
        return (
            <div className="max-w-2xl mx-auto border-x border-gray-700 min-h-screen">
                <div className="p-6">
                    <div className="animate-pulse">
                        <div className="h-24 w-24 rounded-full bg-gray-800" />
                        <div className="mt-4 h-4 w-32 bg-gray-800 rounded" />
                        <div className="mt-2 h-4 w-48 bg-gray-800 rounded" />
                    </div>
                </div>
            </div>
        );
    }

    return <ProfilePage username={currentUser.username} />;
}
