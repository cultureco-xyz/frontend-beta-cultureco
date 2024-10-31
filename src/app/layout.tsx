import type { Metadata } from "next";
import "./globals.css";
import GoogleAuthProvider from "./providers/GoogleAuthProvider";
import ReactQueryProvider from "./providers/ReactQueryProvider";

export const metadata: Metadata = {
  title: "CultureCo",
  description: "Culture Co",
  icons: {
    icon: "/header-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased font-groteskRegular min-h-svh`}>
        <ReactQueryProvider>
          <GoogleAuthProvider>{children}</GoogleAuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
