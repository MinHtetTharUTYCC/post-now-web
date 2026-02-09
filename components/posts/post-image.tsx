'use client';

import Image from 'next/image';
import { useState } from 'react';

interface PostImageProps {
    imageUrl: string;
    alt?: string;
    className?: string;
}

export function PostImage({ imageUrl, alt = 'Post image', className = '' }: PostImageProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return null;
    }

    return (
        <div className={`relative overflow-hidden bg-gray-900 ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-gray-600 border-t-white rounded-full animate-spin" />
                </div>
            )}
            <Image
                src={imageUrl}
                alt={alt}
                width={800}
                height={600}
                className={`w-full h-auto object-cover transition-opacity ${
                    isLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                }}
                unoptimized
            />
        </div>
    );
}
