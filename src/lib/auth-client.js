import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: typeof window !== "undefined" ? window.location.origin : "https://bazar-dor-git-main-intelligent-webworks.vercel.app",
});

export const { signIn, signUp, useSession, signOut } = authClient;