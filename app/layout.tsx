import type { Metadata } from "next";
import { Toaster }  from "sonner";
import "./globals.css";
import { Github } from "lucide-react";


export const metadata: Metadata = {
  title: "dev explorer",
  description: " A place to explore and share development resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased bg-black`}
      >
        {children}
        <Toaster position="top-right" richColors />
                 <div className="fixed bottom-4 right-4 text-xs text-gray-400 z-30 bg-black/50 p-2 rounded flex items-center gap-2 border border-gray-700">
        its fully programmed by abdelrahman <a href="https://github.com/abdelrahman1dev/" className="" target="_blank" rel="noopener noreferrer"><Github className='text-sm'/></a>
      </div>
      </body>
    </html>
  );
}
