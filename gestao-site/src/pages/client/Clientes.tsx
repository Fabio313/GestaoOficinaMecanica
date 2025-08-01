import { useState } from "react";
import ClienteForm from "../../components/client/ClienteForm";
import ClienteList from "../../components/client/ClienteList";
import styles from "./Clientes.module.css";

export default function Clientes() {
  const [atualizar, setAtualizar] = useState(false);

  function handleClienteCriado() {
    setAtualizar((a) => !a)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Clientes</h1>
      <div className={styles.content}>
        <div className={styles.card}>
          <ClienteForm onClienteCriado={handleClienteCriado} />
        </div>
        <div className={styles.card}>
          <ClienteList key={String(atualizar)} />
        </div>
      </div>
    </div>
  );
}
