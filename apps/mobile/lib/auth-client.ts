import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

import dotenv from "dotenv";

dotenv.config();

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_BACKEND_URL,
    plugins: [
        expoClient({
            scheme: "undrink",
            storagePrefix: "undrink",
            storage: SecureStore,
        })
    ]
});