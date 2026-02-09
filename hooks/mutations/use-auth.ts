'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/lib/api-client';
import type { LoginRequestDto, UserCreateDto, AuthResponseDto } from '@/src/generated/api/models';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../stores/use-auth-store';

export function useLogin() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const setToken = useAuthStore((state) => state.setToken);

    return useMutation<AuthResponseDto, Error, LoginRequestDto>({
        mutationFn: async (credentials) => {
            const response = await authApi.login({ loginRequestDto: credentials });
            return response;
        },
        onSuccess: (data) => {
            if (data.token) {
                setToken(data.token);
                queryClient.invalidateQueries();
                router.push('/');
            }
        },
    });
}

export function useRegister() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const setToken = useAuthStore((state) => state.setToken);

    return useMutation<AuthResponseDto, Error, UserCreateDto>({
        mutationFn: async (userData) => {
            const response = await authApi.register({ userCreateDto: userData });
            return response;
        },
        onSuccess: (data) => {
            if (data.token) {
                setToken(data.token);
                queryClient.invalidateQueries();
                router.push('/');
            }
        },
    });
}

export function useLogout() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const removeToken = useAuthStore((state) => state.removeToken);

    return useMutation({
        mutationFn: async () => {
            removeToken();
            queryClient.clear();
        },
        onSuccess: () => {
            router.push('/signin');
        },
    });
}
