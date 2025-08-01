import { useState } from "react";
import OrdemServicoForm from "../../components/ordemServico/OrdemServicoForm";
import OrdemServicoList from "../../components/ordemServico/OrdemServicoList";
import styles from "./OrdemServico.module.css";

export default function OrdensServico() {
  const [atualizar, setAtualizar] = useState(false);

  function handleOrdemCriada() {
    setAtualizar((a) => !a);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ordens de Serviço</h1>
      <div className={styles.content}>
        <div className={styles.card}>
          <OrdemServicoForm onOrdemCriada={handleOrdemCriada} />
        </div>
        <div className={styles.card}>
          <OrdemServicoList key={String(atualizar)} />
        </div>
      </div>
    </div>
  );
}
