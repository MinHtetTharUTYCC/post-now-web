'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRegister } from '@/hooks/mutations/use-auth';
import Link from 'next/link';

const signupSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
});

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
        },
    });

    const registerMutation = useRegister();

    const onSubmit = (data: SignupFormData) => {
        registerMutation.mutate(data);
    };

    return (
        <div className="w-full max-w-md mx-auto p-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Sign Up</h1>
                <p className="text-gray-400">Create your Post Now account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            {...register('firstName')}
                            className="w-full px-4 py-2 bg-black border border-gray-700 text-white focus:outline-none focus:border-white transition"
                            placeholder="John"
                        />
                        {errors.firstName && (
                            <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            {...register('lastName')}
                            className="w-full px-4 py-2 bg-black border border-gray-700 text-white focus:outline-none focus:border-white transition"
                            placeholder="Doe"
                        />
                        {errors.lastName && (
                            <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="username" className="block text-sm font-medium mb-2">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        {...register('username')}
                        className="w-full px-4 py-2 bg-black border border-gray-700 text-white focus:outline-none focus:border-white transition"
                        placeholder="johndoe"
                    />
                    {errors.username && (
                        <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className="w-full px-4 py-2 bg-black border border-gray-700 text-white focus:outline-none focus:border-white transition"
                        placeholder="john@example.com"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
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

                {registerMutation.error && (
                    <div className="p-3 bg-red-900/20 border border-red-500 text-red-500 text-sm">
                        {registerMutation.error.message ||
                            'Failed to create account. Please try again.'}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={registerMutation.isPending}
                    className="w-full px-6 py-3 bg-white text-black font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {registerMutation.isPending ? 'Creating account...' : 'Sign Up'}
                </button>
            </form>

            <div className="mt-6 text-center text-sm">
                <span className="text-gray-400">Already have an account? </span>
                <Link href="/signin" className="text-white hover:underline">
                    Sign In
                </Link>
            </div>
        </div>
    );
}
