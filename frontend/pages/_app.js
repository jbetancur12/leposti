import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import fetch from "isomorphic-fetch";
import AppContext from "../context/AppContext";
import '../styles/globals.css'
import 'antd/dist/antd.css'
import 'react-quill/dist/quill.snow.css';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)

  const userLoged = (user) => {
    setUser(user)
  }

  useEffect(() => {
    const token = Cookie.get("token");

    if (token) {
      fetch('https://api.leposti.ml/users/me', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTM5NzA2LCJleHAiOjE2MjA1MzE3MDZ9.lwwNZWcqvDCkmzxKHWaglDtYjkFTizqD5s_0oXEHcgQ`,
        }
      }).then(async (res) => {
        if (!res.ok) {
          Cookie.remove('token')
          setUser(null)
          return null
        }
        const user = await res.json();
        userLoged(user)

      })

    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        user: user,
        isAuthenticated: !!user,
        setUserLoged: userLoged
      }}>

      <Component {...pageProps} />)
    </AppContext.Provider>
  )
}

export default MyApp
