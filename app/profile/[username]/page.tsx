import { ProfilePage } from '@/components/profile/profile-page';

interface PageProps {
    params: Promise<{ username: string }>;
}

export default async function UserProfilePage({ params }: PageProps) {
    const { username } = await params;

    return <ProfilePage username={username} />;
}
