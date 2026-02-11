'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface CustomAvatarProps {
    src?: string;
    alt?: string;
    fallback?: string;
    size?: 'sm' | 'default' | 'lg';
    className?: string;
}

export function CustomAvatar({
    src,
    alt = 'User',
    fallback = '?',
    size = 'default',
    className,
}: CustomAvatarProps) {
    return (
        <Avatar size={size} className={className}>
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
    );
}
