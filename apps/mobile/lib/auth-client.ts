import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import { usernameClient } from "better-auth/client/plugins";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra ?? {};
const apiUrl = (extra.apiUrl as string | undefined) ?? "http://localhost:3000";

export const authClient = createAuthClient({
    // Read API URL from Expo config (built from `.env` at config-time).
    baseURL: apiUrl,
    plugins: [
        expoClient({
            scheme: "undrink",
            storagePrefix: "undrink",
            storage: SecureStore,
        }),
        usernameClient()
    ]
});