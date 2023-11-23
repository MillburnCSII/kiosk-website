import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "501094726325-e97g9drjb6vvdcc1luggr2ibd5amq9a4.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  secret: process.env.SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
