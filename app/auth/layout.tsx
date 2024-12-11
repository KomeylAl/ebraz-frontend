import { Toaster } from 'react-hot-toast'
import '../../app/globals.css'

export const metadata = {
  title: 'کلینیک ابراز - ورود',
  description: 'کلینیک ابراز - ورود',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-gray-200/40'>
        <Toaster />
        {children}
      </body>
    </html>
  )
}
