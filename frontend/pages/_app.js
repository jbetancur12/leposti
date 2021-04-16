import { CookiesProvider } from "react-cookie"
import '../styles/globals.css'
import 'antd/dist/antd.css'
import 'react-quill/dist/quill.snow.css';

function MyApp({ Component, pageProps }) {
  return (  <CookiesProvider><Component {...pageProps} /></CookiesProvider>)
}

export default MyApp
