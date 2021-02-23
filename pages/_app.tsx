import "../styles/globals.css"
import "../styles/bootstrap.min.css"
import { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
