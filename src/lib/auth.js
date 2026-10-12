export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        autoSignIn: true, // এটি যুক্ত করুন যাতে সাইন-আপের পরেই অটো-লগইন হয়ে যায়
    },

    socialProviders:{
        google:{
            clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET
        },
        github:{
            clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID,
            clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET
        }
    },

    database: mongodbAdapter(db, {
        client,
    }),
});