import type { Metadata } from "next";
import "./globals.css";
import GoogleAuthProvider from "./providers/GoogleAuthProvider";
import ReactQueryProvider from "./providers/ReactQueryProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://cultureco.xyz"),
  title: "CultureCo",
  description: "Built by Fans, For the Culture",
  icons: {
    icon: "/ccLogo.png",
  },
  openGraph: {
    type: "website",
    url: "https://cultureco.xyz", // Update with your website URL
    title: "CultureCo",
    description: "Built by Fans, For the Culture",
    images: [
      {
        url: "/images/landingpage-linkpreview.png", // Path to your preview image
        width: 393,
        height: 719,
        alt: "CultureCo Preview Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CultureCo",
    description: "Built by Fans, For the Culture",
    images: [
      {
        url: "/images/landingpage-linkpreview.png", // Path to your preview image
        width: 393,
        height: 719,
        alt: "CultureCo Preview Image",
      },
    ],
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
