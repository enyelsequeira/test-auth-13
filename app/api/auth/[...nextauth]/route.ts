import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../client";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  // Configure one or more authentication providers
  pages: {
    // if theres an error just send them back to the home page
    error: "/", // Error code passed in query string as ?error=
    signIn: "/",
  },
  adapter: PrismaAdapter(prisma),

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!!,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token, newSession }) {
      console.log("session callback");

      console.log({ YESESSIONHERE: session, YESUSER: user, token, newSession });
      if (session.user) {
        session.user.id = user.id;
        session.user.email = user.email;
        // (session.user.id = token.sub as string),
        //   (session.user.email = token.email as string);
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
