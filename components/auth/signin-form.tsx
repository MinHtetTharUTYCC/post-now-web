'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLogin } from '@/hooks/mutations/use-auth';
import Link from 'next/link';

const signinSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SigninFormData = z.infer<typeof signinSchema>;

export function SigninForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SigninFormData>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const loginMutation = useLogin();

    const onSubmit = (data: SigninFormData) => {
        loginMutation.mutate(data);
    };

    return (
        <div className="w-full max-w-md mx-auto p-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Sign In</h1>
                <p className="text-gray-400">Welcome back to Post Now</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium mb-2">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        {...register('username')}
                        className="w-full px-4 py-2 bg-black border border-gray-700 text-white focus:outline-none focus:border-white transition"
                        placeholder="Enter your username"
                    />
                    {errors.username && (
                        <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        {...register('password')}
                        className="w-full px-4 py-2 bg-black border border-gray-700 text-white focus:outline-none focus:border-white transition"
                        placeholder="Enter your password"
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                    )}
                </div>

                {loginMutation.error && (
                    <div className="p-3 bg-red-900/20 border border-red-500 text-red-500 text-sm">
                        {loginMutation.error.message ||
                            'Failed to sign in. Please check your credentials.'}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="w-full px-6 py-3 bg-white text-black font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
                </button>
            </form>

            <div className="mt-6 text-center text-sm">
                <span className="text-gray-400">Don't have an account? </span>
                <Link href="/signup" className="text-white hover:underline">
                    Sign Up
                </Link>
            </div>
        </div>
    );
}
