import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moon Developements Inc. Property Desk",
  description:
    "A demo rental property desk for rent tracking, lease follow-ups, invoices, payments, and expenses.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
