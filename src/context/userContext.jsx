import { createContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);

  function handleUserData() {
    const token = localStorage.getItem('linkr_token');
    if (token) {
      const {
        email,
        id,
        name,
        photo,
      } = jwtDecode(token);

      setUserData({
        email,
        id,
        name,
        photo,
      });
    }
  }

  useEffect(() => {
    handleUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>
  );
}
