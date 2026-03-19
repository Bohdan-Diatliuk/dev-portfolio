import type { Metadata } from "next";
import "@/components/ui/globals.css";
import Script from "next/script";

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
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.clouds.min.js"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}