import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      let isAllowedToSignIn = false;
      if (
        profile.email == "alexandrabunch23@gmail.com" ||
        profile.email == "eric2008zheng@gmail.com" ||
        profile.email == "ritvikgupta011@gmail.com" ||
        profile.email == "xz.wired@gmail.com"
      ) {
        isAllowedToSignIn = true;
      }
      if (isAllowedToSignIn) {
        return true;
      } else {
        return false;
      }
    },
  },
  secret: process.env.SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
