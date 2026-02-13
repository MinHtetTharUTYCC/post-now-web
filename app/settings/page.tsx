'use client';

import { useCurrentUser, useDeleteCurrentUser } from '@/hooks/queries/use-user';

export default function SettingsPage() {
    const { data: currentUser } = useCurrentUser();
    const deleteAccountMutation = useDeleteCurrentUser();

    const handleDeleteAccount = () => {
        if (!window.confirm('Delete your account? This cannot be undone.')) return;
        deleteAccountMutation.mutate();
    };

    return (
        <div className="max-w-2xl mx-auto border-x border-gray-700 min-h-screen">
            <div className="sticky top-0 z-10 border-b border-gray-700 backdrop-blur bg-black/80 p-4">
                <h1 className="text-xl font-bold">Settings</h1>
            </div>

            <div className="p-6 space-y-8">
                <section className="border border-gray-700 rounded p-4">
                    <h2 className="text-lg font-semibold">Account</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Signed in as @{currentUser?.username || 'user'}
                    </p>

                    <div className="mt-4">
                        <button
                            onClick={handleDeleteAccount}
                            disabled={deleteAccountMutation.isPending}
                            className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500/10 transition disabled:opacity-50"
                        >
                            {deleteAccountMutation.isPending ? 'Deleting...' : 'Delete Account'}
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}
