import { EditPostForm } from '@/components/posts/edit-post-form';

interface PostEditPageProps {
    params: { id: string };
}

export default function PostEditPage({ params }: PostEditPageProps) {
    const postId = Number(params.id);
    return <EditPostForm postId={postId} />;
}
