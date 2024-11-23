import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const users: Map<
  String,
  { id: string; password: string; name: string }
> = new Map([
  ["jsmith", { id: "jsmith", password: "password1", name: "John Smith" }],
  ["jdoe", { id: "jdoe", password: "password2", name: "Jane Doe" }],
]);

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Password",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "Password" },
      },

      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        if (!users.has(credentials.username)) {
          return null;
        }
        const user = users.get(credentials.username);

        if (user.password !== credentials.password) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
