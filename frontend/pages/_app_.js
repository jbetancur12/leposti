import React from "react";
import AppContext from "../context/AppContext";
import { ProtectRoute } from '../context/auth'
import '../styles/globals.css'
import 'antd/dist/antd.css'
import 'react-quill/dist/quill.snow.css';


function MyApp({ Component, pageProps }) {

  return (
    <AppContext.Provider>
      <ProtectRoute>
        <Component {...pageProps} />)
     </ProtectRoute>
    </AppContext.Provider>
  )
}

export default MyApp
