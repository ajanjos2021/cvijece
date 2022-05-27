import styles from "./styles.module.css";

function Button({ text, onClick, type = 1 }) {
  let cssKlasa = type == 1 ? styles.button1 : styles.button2;

  return (
    <button className={cssKlasa} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
