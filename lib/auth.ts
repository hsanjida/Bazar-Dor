import { betterAuth } from "better-auth";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "mock-github-id",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "mock-github-secret",
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-google-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-google-secret",
    },
  },
});
