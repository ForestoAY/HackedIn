import { createContext, useState } from "react";

export const AuthContext = createContext({
  isSignedIn: false,
  setIsSignedIn: () => {},
});

export function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        setIsSignedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}