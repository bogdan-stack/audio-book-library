import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'

import Sidebar from '@/components/Sidebar'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import SupabaseProvider from '@/providers/SupabaseProvider'
import AuthUserProvider from '@/providers/AuthUserProvider'
import UserProvider from '@/providers/UserProvider'
import getBooksByUserId from '@/actions/getBooksById'
import Player from '@/components/Player'



const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Biblioteca Audio AR',
  description: 'Asculta!',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userBooks = await getBooksByUserId();
  return (
    <html lang="en">
      <body className={font.className}>
        <AuthUserProvider>
          <UserProvider>
            <SupabaseProvider>
          <ToasterProvider/>
            <ModalProvider/>
              <Sidebar books={userBooks}>
                {children}
              </Sidebar>
              <Player />
            </SupabaseProvider>
          </UserProvider>
        </AuthUserProvider>
      </body>
    </html>
  )
}
