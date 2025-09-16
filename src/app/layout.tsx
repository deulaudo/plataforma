import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";

import localFont from "next/font/local";

import { MultipleLoginAlert } from "@/components/MultipleLoginAlert";
import { ThemeProvider } from "@/components/ThemeProvider";

import "./globals.css";

const plusJakartaSans = localFont({
  src: [
    {
      path: "../fonts/PlusJakartaSans-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Deu Laudo",
  description:
    "Uma radiologia acessível, interativa e, acima de tudo, mais humana na palma da sua mão, em um portal constantemente atualizado e cheio de novidades.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={twMerge(
          `${plusJakartaSans.className} antialiased`,
          "bg-white dark:bg-[#0F1420]",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <MultipleLoginAlert />
        </ThemeProvider>
      </body>
    </html>
  );
}
