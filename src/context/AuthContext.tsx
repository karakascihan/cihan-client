import React, { createContext, useContext, useState, type ReactNode } from "react";

type Role = "admin" | "user" | "viewer";

interface User {
  name: string;
  role: Role;
}

interface AuthContextType {
  user: User;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user] = useState<User>({ name: "Cihan KARAKAŞ", role: "admin" });

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
