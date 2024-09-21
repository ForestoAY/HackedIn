import { createContext, useState } from "react";

export const AuthContext = createContext({
  isSignedIn: false,
  user: null,
  setIsSignedIn: () => {},
  setUser: () => {},
});

export function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        user,
        setIsSignedIn,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
