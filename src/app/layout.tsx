import React from "react";
import Providers from "../providers";
import "./globals.css";
import RootWrapper from "../components/RootWrapper";
import { Toaster } from "sonner";

export const metadata = {
  title: "Connect with Africa | Empowering Those Who Serve. Saving Lives Across Africa.",
  description:
    "Connect with Africa is a humanitarian initiative dedicated to bridging global generosity with local needs across African communities. We work alongside clinics, healthcare workers, community leaders, and development partners to deliver critical medical supplies, strengthen frontline healthcare, and create pathways for sustainable community development.",
  openGraph: {
    title: "Connect with Africa - Connecting Global Generosity. Empowering African Communities.",
    description:
      "A humanitarian initiative dedicated to bridging global generosity with local needs across African communities.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Nunito+Sans:wght@300;400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
     
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Providers>
          <RootWrapper>
            {children}
            <Toaster position="top-right" richColors />
          </RootWrapper>
        </Providers>
      </body>
    </html>
  );
}
