import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "../../contexts/authContext";
import { API_REGISTRATION, API_USER_ME } from "../../constants/endpoints";

import styles from "./styles.module.css";
import Button from "../button";

function FormaZaRegistraciju({ onCancelHandler, logoutButton }) {
  const { saveAppUser } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [dateOfBirth, setDateOfBirth] = useState("");

  const [emailAddress, setEmailAddress] = useState("");

  const [password, setPassword] = useState("");

  function SaveFirstName(event) {
    setFirstName(event.target.value);
  }

  function SaveLastName(event) {
    setLastName(event.target.value);
  }

  function SaveDateOfBirth(event) {
    setDateOfBirth(event.target.value);
  }

  function SaveEmailAddress(event) {
    setEmailAddress(event.target.value);
  }

  function SavePassword(event) {
    setPassword(event.target.value);
  }

  async function buttonForCreateNewAccount() {
    let uneseniPodaci = {
      email: emailAddress,
      password: password,
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dateOfBirth,
    };

    const response = await axios.post(API_REGISTRATION, uneseniPodaci);

    if (response.status === 200) {
      const authToken = response.data.auth_token;
      Cookies.set("Authorization", authToken, { expires: 2 });

      const registerUserDataResponse = await axios.get(API_USER_ME, {
        headers: {
          Authorization: authToken,
        },
      });

      if (registerUserDataResponse.status === 200) {
        let user = registerUserDataResponse.data.user;
        saveAppUser({
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
        });
        onCancelHandler();
      }
    }
  }

  return (
    <div className={styles.form}>
      <div className={styles.nazivForme}>Create an Account</div>
      <div>
        <input
          className={styles.input}
          placeholder="First Name"
          onChange={SaveFirstName}
        ></input>
      </div>
      <div>
        <input
          className={styles.input}
          placeholder="Last Name"
          onChange={SaveLastName}
        ></input>
      </div>
      <div>
        <input
          className={styles.input}
          placeholder="Date of Birth"
          onChange={SaveDateOfBirth}
        ></input>
      </div>
      <div>
        <input
          className={styles.input}
          placeholder="Email address"
          onChange={SaveEmailAddress}
        ></input>
      </div>
      <div>
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          onChange={SavePassword}
        ></input>
      </div>
      <div className={styles.formButtons}>
        <Button text="Cancel" onClick={onCancelHandler} type={2} />
        <Button text="Create Account" onClick={buttonForCreateNewAccount} />
      </div>
    </div>
  );
}

export default FormaZaRegistraciju;
