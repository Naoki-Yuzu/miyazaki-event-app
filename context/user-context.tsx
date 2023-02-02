import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { auth, db } from '../firebase/client-app';
import { User } from '../types/user';

type ContextType = {
  // firebaseUser: FirebaseUser | null | undefined;
  currentUser: any;
  isLoading: boolean;
  user: User | null | undefined;
}

const UserContext = createContext<ContextType>({
  currentUser: undefined,
  isLoading: true,
  user: undefined
});

export const UserProvider = ({children}: {children: ReactNode}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<Object | null>();
  const user = undefined;

  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, (user) => {
      try {
        if (user) {
          setCurrentUser(user)
        } else {
          setCurrentUser(null);
        }
      }
      catch (err) {
        console.log("エラー :", err)
      }
      finally {
        setIsLoading(false);
      }
    })

    return () => unsubscriber()
  }, [])

  return (
    <UserContext.Provider value={{currentUser, isLoading, user}}>{children}</UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext);