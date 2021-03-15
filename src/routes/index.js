import React from 'react';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../contexts/auth';
import LoaderSpinner from '../components/LoaderSpinner';

export default function () {
  const { isUserSignedIn, loading } = useAuth();

  if (loading) {
    return <LoaderSpinner size={300} />;
  }

  return isUserSignedIn ? <AppRoutes /> : <AuthRoutes />;
}
