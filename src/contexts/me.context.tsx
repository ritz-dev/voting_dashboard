// context/UserContext.js
import { User } from '@/types';
import { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the context value
interface UserContextType {
    user: User | null;
    updateUser: (userData: User) => void;
    setUserVoted: (VotedData: any) => void;
    userVoted: any;
}

// Create the context with the defined type
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userVoted, setUserVoted] = useState<any>(null);

  // Function to update user data
  const updateUser = (userData: User) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser,userVoted,setUserVoted }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
