import '@styles/globals.scss'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { SSRProvider } from 'react-bootstrap'
import { ProgressBar } from '@components/ProgressBar'

config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <ProgressBar />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </SSRProvider>
  )
}

export default MyApp
