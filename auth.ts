import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { env } from "./env";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 3600, // 1 hour
  },
  secret: env.AUTH_SECRET,
  providers: [Google],
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      // console.log("red-trig");
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (url.startsWith(baseUrl)) return url;
      return `${baseUrl}/workspace`;
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
