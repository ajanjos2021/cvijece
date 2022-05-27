import axios from "axios";
import Cookies from "js-cookie";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { API_USER_ME } from "../constants/endpoints";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [appUser, setAppUser] = useState(null);

  function saveAppUser(user) {
    setAppUser(user);
  }

  useEffect(() => {
    let cookie = Cookies.get("Authorization");

    async function run() {
      if (cookie) {
        const odgovor = await axios.get(API_USER_ME, {
          headers: {
            Authorization: cookie,
          },
        });

        if (odgovor.status == 200) {
          const user = odgovor.data.user;
          setAppUser({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
          });
        }
      }
    }

    run();
  }, []);

  return (
    <AuthContext.Provider value={{ appUser, saveAppUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
