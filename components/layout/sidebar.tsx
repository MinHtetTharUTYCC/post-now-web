'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, PlusSquare, Settings, LogOut, Menu, X, Bell } from 'lucide-react';
import { useAuthStore } from '@/hooks/stores/use-auth-store';
import { useLogout } from '@/hooks/mutations/use-auth';
import { useUnreadCount } from '@/hooks/queries/use-notifications';
import { useCurrentUser } from '@/hooks/queries/use-user';
import { CustomAvatar } from '@/components/ui/custom-avatar';
import { useState } from 'react';

const menuItems = [
    { icon: Home, label: 'Home', href: '/', auth: false },
    { icon: Bell, label: 'Notifications', href: '/notifications', auth: true, showBadge: true },
    { icon: PlusSquare, label: 'Create Post', href: '/posts/create', auth: true },
    { icon: User, label: 'Profile', href: '/profile', auth: true },
    { icon: Settings, label: 'Settings', href: '/settings', auth: true },
];

export function Sidebar() {
    const pathname = usePathname();
    const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated());
    const logoutMutation = useLogout();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { data: unreadData } = useUnreadCount();
    const { data: currentUser } = useCurrentUser();

    const filteredMenuItems = menuItems.filter((item) => !item.auth || isAuthenticated);
    const unreadCount = unreadData?.count || 0;

    const handleLogout = () => {
        logoutMutation.mutate();
        setIsMobileMenuOpen(false);
    };

    const getInitials = () => {
        if (currentUser?.firstName && currentUser?.lastName) {
            return `${currentUser.firstName[0]}${currentUser.lastName[0]}`.toUpperCase();
        }
        return currentUser?.username?.[0]?.toUpperCase() || 'U';
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-black border border-gray-700 rounded hover:bg-gray-900 transition"
                aria-label="Toggle menu"
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/80 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-black border-r border-gray-700 z-40 transform transition-transform duration-300 ${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0`}
            >
                <div className="flex flex-col h-full p-4">
                    {/* Logo */}
                    <div className="mb-8 pt-2">
                        <Link
                            href="/"
                            className="text-2xl font-bold"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Post Now
                        </Link>
                    </div>

                    {/* Menu Items */}
                    <nav className="flex-1 space-y-2">
                        {filteredMenuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive =
                                item.href === '/profile'
                                    ? pathname === '/profile' ||
                                      (currentUser?.username &&
                                          pathname === `/profile/${currentUser.username}`)
                                    : pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition relative ${
                                        isActive
                                            ? 'bg-white text-black font-semibold'
                                            : 'hover:bg-gray-900 text-white'
                                    }`}
                                >
                                    <Icon size={24} />
                                    <span className="text-lg">{item.label}</span>
                                    {item.showBadge && unreadCount > 0 && (
                                        <span className="absolute left-8 top-2 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                                            {unreadCount > 99 ? '99+' : unreadCount}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Auth Section */}
                    <div className="border-t border-gray-700 pt-4 space-y-2">
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                disabled={logoutMutation.isPending}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-900 transition w-full text-left disabled:opacity-50"
                            >
                                <CustomAvatar
                                    src={currentUser?.profileImage}
                                    alt={currentUser?.username || 'User'}
                                    fallback={getInitials()}
                                    size="sm"
                                />
                                <span className="text-base flex-1 truncate">
                                    @{currentUser?.username || 'User'}
                                </span>
                                <LogOut size={20} className="shrink-0" />
                            </button>
                        ) : (
                            <>
                                <Link
                                    href="/signin"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-4 py-3 text-center bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/signup"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-4 py-3 text-center border border-white text-white font-semibold rounded-lg hover:bg-gray-900 transition"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}
