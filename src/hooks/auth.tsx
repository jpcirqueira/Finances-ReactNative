import React, { 
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect } from 'react';
import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps){

  const [ user, setUser] = useState<User>({} as User)

  async function signInWithGoogle() {
    try {
      const result = await Google.logInAsync({
        iosClientId: '702408531274-l7dgl0ufuik00deffbtr1m19gailn6p5.apps.googleusercontent.com',
        androidClientId: '702408531274-ei5hsftr75bf831trljpqnq68r7orj1s.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      })

      if(result.type === 'success'){
        const userLogged ={
          id: String(result.user.id),
          email: result.user.email!,
          name: result.user.name!,
          photo: result.user.photoUrl!
        };
        setUser(userLogged)
        await AsyncStorage.setItem('@finances:user', JSON.stringify(userLogged))
      }

      
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    async function loadUserStorageDate() {
      const userStoraged = await AsyncStorage.getItem('@finances:user');
      
      if(userStoraged){
        const userLogged = JSON.parse(userStoraged) as User;
        setUser(userLogged)
      }

    }
    loadUserStorageDate();
  },[])
  return(
    <AuthContext.Provider
      value={{ user, signInWithGoogle }}
    >
      { children }
    </AuthContext.Provider>
  )
}

function useAuth(){
  const context = useContext(AuthContext);
  return context;
}
export { AuthProvider, useAuth}