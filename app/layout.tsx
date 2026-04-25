import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mahjong Evolve - Tile Betting Game",
  description: "A strategic Mahjong-inspired tile betting game. Bet higher or lower and climb the leaderboard!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
