'use client';

import { Sidebar } from './sidebar';

export function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-black text-white">
            <Sidebar />
            <div className="lg:ml-64">{children}</div>
        </div>
    );
}
