import React, { useEffect } from "react";

import Head from "next/head";
import { useAuth } from "../context/auth";
import { AuthProvider } from "../context/auth"
import '../styles/globals.css'
import 'antd/dist/antd.css'
import 'react-quill/dist/quill.snow.css';


function MyApp({ Component, pageProps }) {

  const { isAuthenticated, isLoading, token, logout } = useAuth();

  useEffect(() => {
    if (Component.requiresAuth && token && !isAuthenticated && !isLoading) {
      // Invalid token
      logout({ redirectLocation: Component.redirectUnauthenticatedTo });
    }
  }, [isLoading, isAuthenticated, token]);

  console.log(useAuth());
  return (
    <>
      {Component.requiresAuth && (
        <Head>
          <script
            // If no token is found, redirect inmediately
            dangerouslySetInnerHTML={{
              __html: `if(!document.cookie || document.cookie.indexOf('token') === -1)
            {location.replace(
              "/login?next=" +
                encodeURIComponent(location.pathname + location.search)
            )}
            else {document.documentElement.classList.add("render")}`,
            }}
          />
        </Head>
      )}
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp
