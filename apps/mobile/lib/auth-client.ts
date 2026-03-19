import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import { usernameClient } from "better-auth/client/plugins";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
    // Read API URL from Expo config (built from `.env` at config-time).
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    plugins: [
        expoClient({
            scheme: process.env.EXPO_PUBLIC_APP_SCHEME,
            storagePrefix: process.env.EXPO_PUBLIC_APP_SCHEME,
            storage: SecureStore,
        }),
        usernameClient()
    ]
});