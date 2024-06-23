import { Inter } from "next/font/google";
import {
  ClerkProvider
} from '@clerk/nextjs'
import "./globals.css";
import ToasterProvider from "@/components/providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: 'Kursus',
    description: 'Kursus is a simple service that provides access many course like udemy',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
          <body className={inter.className}>
               <ToasterProvider/>
               {children}
          </body>
      </html>
    </ClerkProvider>
  );
}
