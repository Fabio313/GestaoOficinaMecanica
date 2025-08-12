import { useState } from "react";
import ClienteList from "../../components/client/ClienteList";
import styles from "./Clientes.module.css";
import { Link } from "react-router-dom";
import ClienteModal from "../../components/client/ClienteModal";
import type { Cliente } from "../../types/Cliente";

export default function Clientes() {
  const [atualizar, setAtualizar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);

  function handleOpenCreateModal() {
    setClienteSelecionado(null);
    setIsModalOpen(true);
  }

  function handleOpenEditModal(cliente: Cliente) {
    setClienteSelecionado(cliente);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setClienteSelecionado(null);
  }

  function handleSuccess() {
    setAtualizar((a) => !a);
    handleCloseModal();
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/" className={styles.btn}>Voltar</Link>
        <h1 className={styles.title}>Clientes</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.card}>
          <h2 className={styles.subtitle}>Adicionar novo cliente</h2>
          <button className={styles.createButton} onClick={handleOpenCreateModal}>
            Adicionar
          </button>
        </div>
        <div className={styles.card}>
          <ClienteList key={String(atualizar)} onEdit={handleOpenEditModal} />
        </div>
      </div>
      <ClienteModal
        open={isModalOpen}
        clienteParaEditar={clienteSelecionado}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />
    </div>
  );
}