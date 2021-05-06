import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-fetch';
import Cookie from 'js-cookie';
import axios from 'axios';

const API_URL = process.env.API_URL || 'https://api.leposti.ml';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadUserFromCookies();
  }, []);

  async function loadUserFromCookies() {
    setLoading(true);
    const token = Cookie.get('token');
    if (token) {
      fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        if (!res.ok) {
          Cookie.remove('token');
          setUser(null);
          return null;
        }
        const user = await res.json();
        setUser(user);
      });
    }
    setLoading(false);
  }

  const login = (identifier, password) => {
    //prevent function from being ran on the server
    if (typeof window === 'undefined') {
      return;
    }

    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/auth/local/`, { identifier, password })
        .then((res) => {
          //set token response from Strapi for server validation
          Cookie.set('token', res.data.jwt);
          setUser(res.data.user);
          //resolve the promise to set loading to false in SignUp form
          resolve(res);
          //redirect back to home page for restaurance selection
        })
        .catch((error) => {
          //reject the promise and pass the error object back to the form
          reject(error);
        });
    });
  };

  const registerUser = (body) => {
    const json = JSON.stringify(body);
    //prevent function from being ran on the server
    if (typeof window === 'undefined') {
      return;
    }
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/auth/local/register`, json, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip',
          },
        })
        .then((res) => {
          //set token response from Strapi for server validation
          Cookie.set('token', res.data.jwt);
          setUser(res.data.user);
          //resolve the promise to set loading to false in SignUp form
          resolve(res);
          //redirect back to home page for restaurance selection
          router.push('/dashboard');
        })
        .catch((error) => {
          //reject the promise and pass the error object back to the form
          reject(error);
        });
    });
  };

  const editUser = (id, body) => {
    const json = JSON.stringify(body);
    //prevent function from being ran on the server
    if (typeof window === 'undefined') {
      return;
    }
    return new Promise((resolve, reject) => {
      axios
        .put(`${API_URL}/users/${id}`, json, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            Authorization: `Bearer ${process.env.TOKEN}`,
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip',
          },
        })
        .then((res) => {
          //set token response from Strapi for server validation
          setUser(res.data.user);
          //resolve the promise to set loading to false in SignUp form
          resolve(res);
          //redirect back to home page for restaurance selection
          router.push('/dashboard/user');
        })
        .catch((error) => {
          //reject the promise and pass the error object back to the form
          reject(error);
        });
    });
  };

  const logout = ({ redirectLocation }) => {
    //remove token and user cookie
    Cookie.remove('token');
    delete window.__user;
    // sync logout between multiple windows
    window.localStorage.setItem('logout', Date.now());
    //redirect to the home page
    setUser(null);
    router.push(redirectLocation || '/');
  };

  return (
    <AuthContext.Provider
      value={{
        token: Cookie.get('token'),
        isAuthenticated: !!user,
        user,
        registerUser,
        login,
        loading,
        logout,
        editUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

//Higher Order Component to wrap our pages and logout simultaneously logged in tabs
// THIS IS NOT USED in the tutorial, only provided if you wanted to implement
export const withAuthSync = (Component) => {
  const router = useRouter();
  const Wrapper = (props) => {
    const syncLogout = (event) => {
      if (event.key === 'logout') {
        router.push('/login');
      }
    };

    useEffect(() => {
      window.addEventListener('storage', syncLogout);

      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      };
    }, []);

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Wrapper.getInitialProps = Component.getInitialProps;
  }

  return Wrapper;
};
