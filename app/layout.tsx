import type { Metadata } from "next";
import "@/components/ui/globals.css";

export const metadata: Metadata = {
  icons: "",
  title: "Bohdan Diatliuk",
  description: "Bohdan's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
