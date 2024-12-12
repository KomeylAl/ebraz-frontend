import { Metadata } from 'next';
import '../globals.css'
import Sidebar from '@/app/admin/_components/SideBar';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "کلینیک ابراز - چنل مدیریت",
  description: "کلینیک ابراز - پنل مدیریت",
};

export default function AdminLayout({
   children,
 }: Readonly<{
   children: React.ReactNode;
 }>) {
   return (
    <html>
    <body className='admin-body'>
      <Toaster />
      <div className="bg-gray-200/40 relative w-full h-dvh">
        <Sidebar />
        <div className="lg:pr-80">{children}</div>
      </div>
    </body>
  </html>
   );
 }