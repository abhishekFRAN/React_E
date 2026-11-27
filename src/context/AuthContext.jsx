import { useState } from "react";
import AuthContext from "./auth-context";

export function AuthProvider({ children }) {
  const [accounts, setAccounts] = useState([]);

  const signup = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (accounts.some((account) => account.email === normalizedEmail)) {
      return { success: false, error: "An account with this email already exists." };
    }

    setAccounts((currentAccounts) => [
      ...currentAccounts,
      { email: normalizedEmail, password },
    ]);

    return { success: true };
  };

  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const account = accounts.find(
      (savedAccount) => savedAccount.email === normalizedEmail,
    );

    if (!account || account.password !== password) {
      return { success: false, error: "Invalid email or password." };
    }

    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ signup, login }}>
      {children}
    </AuthContext.Provider>
  );
}
