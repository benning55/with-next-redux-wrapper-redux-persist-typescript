import '../styles/globals.css'

import { Provider } from 'react-redux'

// @ts-ignore
import { PersistGate } from 'redux-persist/integration/react'
import type { AppProps } from 'next/app'

import store, { persistor } from '../app/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}

export default MyApp
