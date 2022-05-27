import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { API_LOGIN, API_USER_ME } from "../../constants/endpoints";

import styles from "./styles.module.css";
import Button from "../button";

function FormaZaLogin({ zatvoriLoginFormu }) {
  const { saveAppUser } = useContext(AuthContext);

  const [LoginEmail, setLoginEmail] = useState("");

  const [LoginPassword, setLoginPassword] = useState("");

  function saveLoginEmail(event) {
    setLoginEmail(event.target.value);
  }

  function saveLoginPassword(event) {
    setLoginPassword(event.target.value);
  }

  async function onSubmitHandler() {
    const data = {
      email: LoginEmail,
      password: LoginPassword,
    };
    const response = await axios.post(API_LOGIN, data);

    if (response.status === 200) {
      const authToken = response.data.auth_token;

      Cookies.set("Authorization", authToken, { expires: 2 });

      const loggedUserDataResponse = await axios.get(API_USER_ME, {
        headers: {
          Authorization: authToken,
        },
      });

      if (loggedUserDataResponse.status === 200) {
        let user = loggedUserDataResponse.data.user;
        saveAppUser({
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
        });
        zatvoriLoginFormu();
      }
    }
  }

  return (
    <div className={styles.form}>
      <div className={styles.nazivForme}>Welcome back</div>
      <div>
        <input
          className={styles.input}
          placeholder="Email Address"
          onChange={saveLoginEmail}
        ></input>
      </div>
      <div>
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          onChange={saveLoginPassword}
        ></input>
      </div>
      <div className={styles.formButtons}>
        <Button text="Nazad" onClick={zatvoriLoginFormu} type={2} />
        <Button text="Login to your Account" onClick={onSubmitHandler} />
      </div>
    </div>
  );
}

export default FormaZaLogin;
