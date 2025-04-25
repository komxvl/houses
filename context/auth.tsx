'use client';

import { auth } from '@/firebase/client';
import { ParsedToken, User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { rmToken, setToken } from './actions';

type AuthContextType = {
  currentUser: User | null;
  logOut: () => Promise<void>;
  logInWithGoogle: () => Promise<void>;
  customClaims: ParsedToken | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [customClaims, setCustomClaims] = useState<ParsedToken | null>(null);

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user ?? null);
      if (user) {
        const tokenRers = await user.getIdTokenResult();
        const token = tokenRers.token;
        const refreshToken = user.refreshToken;
        const claims = tokenRers.claims;
        setCustomClaims(claims ?? null);
        if (token && refreshToken) {
          await setToken({
            token,
            refreshToken,
          });
        }
      } else {
        await rmToken();
      }
    });

    return () => unSubscribe();
  }, []);

  const logInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logOut = async () => {
    await auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        logOut,
        logInWithGoogle,
        customClaims,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
