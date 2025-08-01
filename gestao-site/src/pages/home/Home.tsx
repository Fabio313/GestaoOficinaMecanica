import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bem-vindo à Gestão de Oficina Mecânica</h1>
      <div className={styles.buttons}>
        <Link to="/clientes" className={styles.btn}>Clientes</Link>
        <Link to="/veiculos" className={styles.btn}>Veículos</Link>
        <Link to="/ordens-servico" className={styles.btn}>Ordens de Serviço</Link>
      </div>
    </div>
  );
}