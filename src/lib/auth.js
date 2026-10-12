import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db("bazardor");

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || "https://bazardors.netlify.app",
    trustedOrigins: [
        "https://bazardors.netlify.app",
        "http://localhost:3000"
    ],

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