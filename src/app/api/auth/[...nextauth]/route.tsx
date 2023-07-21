"use client";
// import { SignalCellularNullOutlined } from "@mui/icons-material";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase";

// Asfand Toor9:54 PM
// import { useState } from "react";

// const App = () => {
//   const [theme, setTheme] = useState<ThemeContextType>("light");

//   return (
//     <ThemeContext.Provider value={theme}>
//       <MyComponent />
//     </ThemeContext.Provider>
//   );
// };

interface User {
  [key: string]: any;
}
export const AuthContext = createContext<any>(null);

export const AuthContextProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// // import NextAuth from "next-auth/next";
// import NextAuth from "next-auth";
// import Providers from "next-auth/providers";
// import { FirebaseAdapter } from "@next-auth/firebase-adapter";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// // import { createContext, useEffect, useState } from "react";
// import { auth, db } from "../Firebase/firebase";

// const handler = NextAuth({
//   adapter: FirebaseAdapter(db),
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "john@example.com",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         return {
//           id: "1",
//         };
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID!,
//       clientSecret: process.env.GOOGLE_SECRET!,
//     }),
//   ],
//   pages: {
//     signIn: "/signin",
//   },
// });

// export { handler as GET, handler as POST };
