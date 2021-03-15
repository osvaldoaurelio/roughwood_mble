import React, {
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react';

import api from '../services/api';
import { sleep } from '../utils';
import { signInService } from '../services/auth';
import { useAsyncStorage } from './useAsyncStorage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [storageUser, setStorageUser] = useAsyncStorage('@roughwood:user');
  const [storageToken, setStorageToken] = useAsyncStorage('@roughwood:token');

  useEffect(() => {
    setLoading(true);

    if (storageUser && storageToken) {
      setUser(storageUser);
      api.defaults.headers.Authorization = `Baerer ${storageToken}`;
    }

    setLoading(false);
  }, [user, storageUser, storageToken]);

  const signIn = async ({ username, password }) => {
    setLoading(true);
  
    const { user, token, error } = await signInService({ username, password });

    api.defaults.headers.Authorization = `Baerer ${token}`;

    setUser(user);
    setError(error);
    setStorageUser(user);
    setStorageToken(token);

    setLoading(false);        
  };

  const signOut = async () => {
    setLoading(true);

    await sleep();
    setUser(null);
    setError(null);
    setStorageUser(null);
    setStorageToken(null);

    setLoading(false);
  };

  const isUserSignedIn = user && user.id;

  (storageToken && !isUserSignedIn) && setStorageToken(null);

  return (
    <AuthContext.Provider
      value={{ isUserSignedIn, user, signIn, signOut, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
