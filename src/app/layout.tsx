import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const suisseIntl = localFont({
  src: "./fonts/SuisseIntl.woff",
  variable: "--font-suisse-intl",
  weight: "100 900",
});
const lugife = localFont({
  src: './fonts/lugife.otf',
  variable: '--font-lugife',
  weight: '400 700',
});

export const metadata: Metadata = {
  title: "Textify - your documents, now conversational",
  description:
    "Instantly converse with your documents—upload, ask questions, and get answers effortlessly",
  icons: [{ rel: "icon", url: "favicon.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} $(suisseIntl.variable) antialiased`}
      >
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
