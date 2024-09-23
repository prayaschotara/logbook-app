import localFont from "next/font/local";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/ui/sidebar";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin section",
};

export default function AdminLayout({ children }) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <div className="flex h-screen bg-gray-100">
        <Sidebar isSuperAdmin={false} />
        <Toaster />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
