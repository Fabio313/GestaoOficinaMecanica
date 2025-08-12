import type { Veiculo } from "../../types/Veiculo";
import VeiculoForm from "./VeiculoForm";
import styles from "../ordemServico/ServicoModal.module.css";

type VeiculoModalProps = {
  open: boolean;
  veiculoParaEditar: Veiculo | null;
  onClose: () => void;
  onSuccess: () => void;
};

export default function VeiculoModal({
  open,
  veiculoParaEditar,
  onClose,
  onSuccess,
}: VeiculoModalProps) {
  if (!open) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>
          {veiculoParaEditar ? "Editar Veículo" : "Adicionar Veículo"}
        </h2>
        <VeiculoForm
          veiculoParaEditar={veiculoParaEditar}
          onSuccess={onSuccess}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
