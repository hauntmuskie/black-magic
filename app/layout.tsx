import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const jakarta = Plus_Jakarta_Sans({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "700"],
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  title: "Santet Online",
  description: "Santet Online v1.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jakarta.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">
              Santet Online v1.0
            </h1>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
