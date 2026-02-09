import { Configuration } from '@/src/generated/api/runtime';
import { AuthControllerApi, UserControllerApi, PostControllerApi } from '@/src/generated/api/apis';
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
