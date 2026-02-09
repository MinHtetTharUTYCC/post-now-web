'use client';

import { User } from 'lucide-react';

interface AvatarProps {
    src?: string;
    alt?: string;
    size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-20 h-20 text-2xl',
};

export function Avatar({ src, alt = 'User avatar', size = 'md' }: AvatarProps) {
    return (
        <div
            className={`${sizeClasses[size]} rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border border-gray-700`}
        >
            {src ? (
                <img src={src} alt={alt} className="w-full h-full object-cover" />
            ) : (
                <User
                    size={size === 'sm' ? 16 : size === 'md' ? 20 : 32}
                    className="text-gray-500"
                />
            )}
        </div>
    );
}
