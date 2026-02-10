import { Configuration } from '@/src/generated/api/runtime';
import {
    AuthControllerApi,
    UserControllerApi,
    PostControllerApi,
    CommentControllerApi,
    NotificationControllerApi,
    FollowControllerApi,
    LikeControllerApi,
} from '@/src/generated/api/apis';
import { useAuthStore } from '@/hooks/stores/use-auth-store';

const config = new Configuration({
    basePath: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090',
    headers: {},
});

export const authApi = new AuthControllerApi(config);
export const userApi = new UserControllerApi(config);
export const postApi = new PostControllerApi(config);

export function getApiConfig(): Configuration {
    const token = useAuthStore.getState().token;
    return new Configuration({
        basePath: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
}

export const apiClient = {
    auth: new AuthControllerApi(config),
    user: new UserControllerApi(config),
    post: new PostControllerApi(config),
    comment: new CommentControllerApi(config),
    notification: new NotificationControllerApi(config),
    follow: new FollowControllerApi(config),
    like: new LikeControllerApi(config),
};

// Function to get authenticated API client
export function getAuthenticatedApiClient() {
    const authConfig = getApiConfig();
    return {
        auth: new AuthControllerApi(authConfig),
        user: new UserControllerApi(authConfig),
        post: new PostControllerApi(authConfig),
        comment: new CommentControllerApi(authConfig),
        notification: new NotificationControllerApi(authConfig),
        follow: new FollowControllerApi(authConfig),
        like: new LikeControllerApi(authConfig),
    };
}
