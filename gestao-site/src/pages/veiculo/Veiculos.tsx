import { useState } from "react";
import VeiculoList from "../../components/vehicle/VeiculoList";
import styles from "./Veiculos.module.css";
import { Link } from "react-router-dom";
import VeiculoModal from "../../components/vehicle/VeiculoModal";
import type { Veiculo } from "../../types/Veiculo";

export default function Veiculos() {
  const [atualizar, setAtualizar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<Veiculo | null>(
    null
  );

  function handleOpenCreateModal() {
    setVeiculoSelecionado(null);
    setIsModalOpen(true);
  }

  function handleOpenEditModal(veiculo: Veiculo) {
    setVeiculoSelecionado(veiculo);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setVeiculoSelecionado(null);
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
        <h1 className={styles.title}>Veículos</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.card}>
          <h2 className={styles.subtitle}>Adicionar novo veículo</h2>
          <button
            className={styles.createButton}
            onClick={handleOpenCreateModal}
          >
            Adicionar
          </button>
        </div>
        <div className={styles.card}>
          <VeiculoList key={String(atualizar)} onEdit={handleOpenEditModal} />
        </div>
      </div>
      <VeiculoModal
        open={isModalOpen}
        veiculoParaEditar={veiculoSelecionado}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
