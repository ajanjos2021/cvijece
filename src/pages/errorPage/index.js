import Header from "../../components/header";

import styles from "./styles.module.css";

function ErrorPage() {
  return (
    <>
      <Header />
      <div className={styles.poruka}>OOPS! An Error occured</div>
    </>
  );
}

export default ErrorPage;
