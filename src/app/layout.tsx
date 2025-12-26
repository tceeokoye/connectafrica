import React from "react";
import Providers from "../providers";
import "./globals.css";
import RootWrapper from "../components/RootWrapper";
import { Toaster } from "sonner";

export const metadata = {
  title: "Connect Africa",
  description:
    "Connect Africa is a mission-driven platform dedicated to supporting healthcare, education, clean water, and community development initiatives across Africa. We connect donors, partners, and communities to create sustainable impact and lasting change.",
  openGraph: {
    title: "Connect Africa",
    description:
      "A mission-driven charity platform supporting healthcare, education, clean water, and community development across Africa.",
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
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800&display=swap"
          rel="stylesheet"
        />
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
