'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileHeader } from './profile-header';
import { ProfilePosts } from './profile-posts';
import { ProfileComments } from './profile-comments';
import { ProfileLikes } from './profile-likes';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface ProfilePageProps {
    username: string;
}

export function ProfilePage({ username }: ProfilePageProps) {
    const router = useRouter();
    return (
        <div className="max-w-2xl mx-auto border-x border-gray-700 min-h-screen">
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-gray-700 backdrop-blur bg-black/80 p-4">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="hover:bg-gray-800 rounded-full p-2 transition"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className="text-xl font-bold">@{username}</h2>
                </div>
            </div>

            {/* Profile Header */}
            <ProfileHeader username={username} />

            {/* Tabs */}
            <Tabs defaultValue="posts" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b border-gray-700 bg-black p-0 h-auto">
                    <TabsTrigger
                        value="posts"
                        className="flex-1 rounded-none py-4 transition font-semibold text-white bg-transparent hover:bg-white hover:text-black data-[state=active]:bg-white data-[state=active]:text-black"
                    >
                        Posts
                    </TabsTrigger>
                    <TabsTrigger
                        value="replies"
                        className="flex-1 rounded-none py-4 transition font-semibold text-white bg-transparent hover:bg-white hover:text-black data-[state=active]:bg-white data-[state=active]:text-black"
                    >
                        Comments
                    </TabsTrigger>
                    <TabsTrigger
                        value="likes"
                        className="flex-1 rounded-none py-4 transition font-semibold text-white bg-transparent hover:bg-white hover:text-black data-[state=active]:bg-white data-[state=active]:text-black"
                    >
                        Likes
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="posts" className="mt-0">
                    <ProfilePosts username={username} />
                </TabsContent>

                <TabsContent value="replies" className="mt-0">
                    <ProfileComments username={username} />
                </TabsContent>

                <TabsContent value="likes" className="mt-0">
                    <ProfileLikes username={username} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
