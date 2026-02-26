import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Dream Girlfriend - AI Companion",
  description: "Chat, connect, and build something real with AI girlfriends made for you.",
  metadataBase: new URL("https://mydreamgirlfriend.ai"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
