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
      <body className={`antialiased font-groteskRegular `}>
        <div className="min-h-svh w-full max-w-mobile mx-auto">
          <ReactQueryProvider>
            <GoogleAuthProvider>{children}</GoogleAuthProvider>
          </ReactQueryProvider>
        </div>
      </body>
    </html>
  );
}
