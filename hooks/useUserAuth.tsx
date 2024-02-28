
import { createContext, useContext, useState, useEffect, ReactNode, use } from 'react';


// Define the User interface
interface User {
  userId: number;
  userEmail: string;
  userName: string;
  userRole: string;
}

// Create a UserContext
export const UserContext = createContext<User | null>(null);

// Create a custom hook that provides the user details


// Define the type of the props
export interface Props {
  [propName:string]: any;
};

// Create a Provider component that uses the decodeToken function
export const AuthUserContextProvider = (props: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/auth/user');
      if (!response.ok) {
        throw null;
      }
      const data = await response.json();
      setUser(data as User);
    };

    fetchUser();
  }, []);
  const value = user ? {
    userId: user.userId,
    userEmail: user.userEmail,
    userName: user.userName,
    userRole: user.userRole
  } : null;

  return <UserContext.Provider value={value} {...props}/>
}
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider from Auth');
  }
  return context;
}