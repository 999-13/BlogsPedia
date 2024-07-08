'use client'; // Ensure this component is client-side

import ProfileNav from "@/app/ui/navbar/ProfileNav";
import { Inter } from "next/font/google";
import NavBar from "@/app/ui/navbar/NavBar";
import "../globals.css"
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [token, setToken] = useState(null);

  const updateToken = () => {
    const storedToken = localStorage.getItem('your_token_key');
    setToken(storedToken);
  };

  useEffect(() => {
    updateToken();

    const handleStorageChange = () => {
      updateToken();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        {token ? <ProfileNav /> : <NavBar />}
        {children}
      </body>
    </html>
  );
}
