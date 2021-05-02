import React, { useEffect } from 'react';

import Head from 'next/head';
import { useAuth, AuthProvider } from '@context/auth';
import '@styles/globals.css';
import 'antd/dist/antd.css';
import 'react-quill/dist/quill.snow.css';

export function reportWebVitals(metric) {
  switch (metric.name) {
    case 'FID':
      console.log('FID=> ', metric.value);
      break;
    case 'LCP':
      console.log('LCP=> ', metric.value);
      break;
    case 'CLS':
      console.log('CLS=> ', metric.value);
      break;
    case 'FCP':
      console.log('FCP=> ', metric.value);
      break;

    default:
      break;
  }
}


function MyApp({ Component, pageProps }) {
  const { isAuthenticated, isLoading, token, logout } = useAuth();
  useEffect(() => {
    if (Component.requiresAuth && token && !isAuthenticated && !isLoading) {
      // Invalid token
      logout({ redirectLocation: Component.redirectUnauthenticatedTo });
    }
  }, [isLoading, isAuthenticated, token]);

  return (
    <>
      {Component.requiresAuth && (
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="canonical" href="https://www.leposti.com/"></link>
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

export default MyApp;
