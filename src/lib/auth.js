import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db("bazardor");

export const auth = betterAuth({
    baseURL: "https://bazar-dor-git-main-intelligent-webworks.vercel.app",
    trustedOrigins: ["https://bazar-dor-git-main-intelligent-webworks.vercel.app"],

    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },

    socialProviders: {
        google: {
            clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET,
        },
        github: {
            clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID,
            clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET,
        },
    },

    database: mongodbAdapter(db, {
        client,
    }),
});