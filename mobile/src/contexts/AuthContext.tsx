import { createContext, ReactNode } from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useState, useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: String;
  avatarUrl: String;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: Boolean;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children } : AuthProviderProps){
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [isUserLoading, setIsUserLoading] = useState(false)

  const [request, response, promptAsync] =  Google.useAuthRequest({
    clientId: '546268455223-36aslps9vnr8bo59u25p3b61okhd1kfh.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })

  async function signIn() {
    try {
      setIsUserLoading(true);

      await promptAsync();

    } catch (error){
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signInWithGoogle(access_token:string) {
    console.log('TOKEN ' , access_token);
  }

  useEffect(() => {
    if((response?.type === 'success') && response.authentication?.accessToken){
      signInWithGoogle(response.authentication.accessToken)
    }
  },[response])

  return (
    <AuthContext.Provider value={{
      signIn,
      isUserLoading,
      user
    }}>
      {children}
    </AuthContext.Provider>
  )
}