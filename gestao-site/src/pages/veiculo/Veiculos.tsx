import { useState } from "react";
import VeiculoForm from "../../components/vehicle/VeiculoForm";
import VeiculoList from "../../components/vehicle/VeiculoList";
import styles from "./Veiculos.module.css";

export default function Veiculos() {
  const [atualizar, setAtualizar] = useState(false);

  function handleVeiculoCriado() {
    setAtualizar((a) => !a);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Veículos</h1>
      <div className={styles.content}>
        <div className={styles.card}>
          <VeiculoForm onVeiculoCriado={handleVeiculoCriado} />
        </div>
        <div className={styles.card}>
          <VeiculoList key={String(atualizar)} />
        </div>
      </div>
    </div>
  );
}