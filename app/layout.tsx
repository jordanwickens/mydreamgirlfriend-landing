import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MyDreamGirlfriend — #1 AI Girlfriend App | Chat, Connect & Build",
    template: "%s | MyDreamGirlfriend.ai",
  },
  description: "Build your dream AI girlfriend with deep customization, 6 relationship stages, voice notes, AI photos & uncensored chat. Private and encrypted. Start free.",
  metadataBase: new URL("https://mydreamgirlfriend.ai"),
  openGraph: {
    siteName: "MyDreamGirlfriend.ai",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
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
