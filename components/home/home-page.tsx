'use client';

import { PostsFeed } from '@/components/posts/posts-feed';
import { useAuthStore } from '@/hooks/stores/use-auth-store';
import Link from 'next/link';

export function HomePage() {
    const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated());

    return (
        <div className="max-w-2xl mx-auto border-x border-gray-700 min-h-screen">
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-gray-700 backdrop-blur bg-black/80 p-4">
                <h2 className="text-xl font-bold">Home</h2>
            </div>

            {/* Compose Tweet / Call to Action */}
            {isAuthenticated && (
                <div className="border-b border-gray-700 p-4">
                    <Link
                        href="/posts/create"
                        className="block p-4 text-xl text-gray-500 hover:bg-gray-900/50 rounded transition"
                    >
                        What's happening!?
                    </Link>
                </div>
            )}

            {!isAuthenticated && (
                <div className="border-b border-gray-700 p-4 text-center bg-gray-900/30">
                    <p className="text-gray-400 mb-3">Sign in to share your thoughts</p>
                    <div className="flex gap-3 justify-center">
                        <Link
                            href="/signin"
                            className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/signup"
                            className="px-6 py-2 border border-white text-white font-semibold rounded-full hover:bg-gray-900 transition"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            )}

            {/* Posts Feed */}
            <PostsFeed />
        </div>
    );
}
