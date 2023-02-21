import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { UserProvider } from '../context/user-context'
import { ChatProvider } from '../context/chat-context'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <UserProvider>
      <ChatProvider>
        {getLayout(<Component {...pageProps} />)}
      </ChatProvider>
    </UserProvider>
  )

}
