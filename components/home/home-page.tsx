'use client';

import { PostsFeed } from '@/components/posts/posts-feed';
import { useAuthStore } from '@/hooks/stores/use-auth-store';
import Link from 'next/link';
import { useState } from 'react';
import { useSearchPosts } from '@/hooks/use-posts';
import { PostCard } from '@/components/posts/post-card';

export function HomePage() {
    const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated());
    const [query, setQuery] = useState('');
    const { data: searchData, isLoading: isSearching } = useSearchPosts(query.trim(), 0, 10);

    const showSearch = query.trim().length > 0;
    const searchResults = searchData?.content ?? [];

    return (
        <div className="max-w-2xl mx-auto border-x border-gray-700 min-h-screen">
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-gray-700 backdrop-blur bg-black/80 p-4">
                <h2 className="text-xl font-bold">Home</h2>
            </div>

            {/* Search */}
            <div className="border-b border-gray-700 p-4">
                <div className="flex gap-2">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search posts"
                        className="flex-1 bg-transparent border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery('')}
                            className="px-3 py-2 border border-gray-700 hover:bg-gray-900 transition text-sm"
                        >
                            Clear
                        </button>
                    )}
                </div>
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

            {/* Posts Feed / Search Results */}
            {showSearch ? (
                <div className="border border-gray-700 divide-y divide-gray-700">
                    {isSearching && (
                        <div className="p-6 text-center text-gray-500">Searching...</div>
                    )}
                    {!isSearching && searchResults.length === 0 && (
                        <div className="p-6 text-center text-gray-500">No results found</div>
                    )}
                    {!isSearching &&
                        searchResults.map((post) => <PostCard key={post.id} post={post} />)}
                </div>
            ) : (
                <PostsFeed />
            )}
        </div>
    );
}
