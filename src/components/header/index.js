import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import FormaZaRegistraciju from "../formaZaRegistraciju";
import FormaZaLogin from "../formaZaLogin";
import Modal from "../modal";

import styles from "./styles.module.css";
import Button from "../button";

function Header() {
  const { appUser, saveAppUser } = useContext(AuthContext);

  const [registracijskaFormaPrikazana, setRegistracijskaFormaPrikazana] =
    useState(false);

  const [loginFormaPrikazana, setLoginFormaPrikazana] = useState(false);

  function showForm_NewAccount() {
    setRegistracijskaFormaPrikazana(true);
  }

  function zatvoriFormuZaRegistraciju() {
    setRegistracijskaFormaPrikazana(false);
  }

  function prikaziLogin() {
    setLoginFormaPrikazana(true);
  }

  function zatvoriLoginFormu() {
    setLoginFormaPrikazana(false);
  }

  function logout() {
    saveAppUser(null);
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Link to="/">FlowrSpot</Link>
        </div>
        <div className={styles.nav}>
          <div className={styles.navItem}>
            {appUser !== null && (
              <div className={styles.navItem}>
                <Link to="/favorites">Favorites</Link>
              </div>
            )}
          </div>
          <div className={styles.navItem}>
            {appUser === null && <div onClick={prikaziLogin}>Login</div>}
          </div>
          {appUser === null && (
            <div className={styles.navItem}>
              <Button text="New Account" onClick={showForm_NewAccount} />
            </div>
          )}

          {appUser !== null && (
            <div className={styles.navItem}>
              {appUser.firstName + " " + appUser.lastName}
            </div>
          )}
          {appUser !== null && (
            <div className={styles.navItem}>
              <Button text="Logout" onClick={logout} />
            </div>
          )}
        </div>
      </div>
      {registracijskaFormaPrikazana && (
        <Modal>
          <FormaZaRegistraciju onCancelHandler={zatvoriFormuZaRegistraciju} />
        </Modal>
      )}

      {loginFormaPrikazana && (
        <Modal>
          <FormaZaLogin zatvoriLoginFormu={zatvoriLoginFormu} />
        </Modal>
      )}
    </>
  );
}

export default Header;
