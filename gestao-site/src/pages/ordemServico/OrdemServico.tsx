import { useState } from "react";
import OrdemServicoList from "../../components/ordemServico/OrdemServicoList";
import styles from "./OrdemServico.module.css";
import { Link } from "react-router-dom";
import OrdemServicoModal from "../../components/ordemServico/OrdemServicoModal";
import type { OrdemServico } from "../../types/OrdemServico";

export default function OrdensServico() {
  const [atualizar, setAtualizar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [osSelecionada, setOsSelecionada] = useState<OrdemServico | null>(null);

  function handleOpenCreateModal() {
    setOsSelecionada(null);
    setIsModalOpen(true);
  }

  function handleOpenEditModal(os: OrdemServico) {
    setOsSelecionada(os);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setOsSelecionada(null);
  }

  function handleSuccess() {
    setAtualizar((a) => !a);
    handleCloseModal();
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/" className={styles.btn}>
          Voltar
        </Link>
        <h1 className={styles.title}>Ordens de Serviço</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.card}>
          <h2 className={styles.subtitle}>Gerenciar Ordens de Serviço</h2>
          <button className={styles.createButton} onClick={handleOpenCreateModal}>
            Adicionar Ordem
          </button>
        </div>
        <div className={styles.card}>
          <OrdemServicoList key={String(atualizar)} onEdit={handleOpenEditModal} />
        </div>
      </div>
      
      <OrdemServicoModal
        open={isModalOpen}
        osParaEditar={osSelecionada}
        onSuccess={handleSuccess}
        onClose={handleCloseModal}
      />
    </div>
  );
}