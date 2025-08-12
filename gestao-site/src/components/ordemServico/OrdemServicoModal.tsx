import type { OrdemServico } from "../../types/OrdemServico";
import OrdemServicoForm from "./OrdemServicoForm";
import styles from "./ServicoModal.module.css";

type OrdemServicoModalProps = {
  open: boolean;
  osParaEditar: OrdemServico | null;
  onClose: () => void;
  onSuccess: () => void;
};

export default function OrdemServicoModal({
  open,
  osParaEditar,
  onClose,
  onSuccess,
}: OrdemServicoModalProps) {
  if (!open) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>
          {osParaEditar ? "Editar Ordem de Serviço" : "Adicionar Ordem de Serviço"}
        </h2>
        <OrdemServicoForm
          osParaEditar={osParaEditar}
          onSuccess={onSuccess}
          onClose={onClose}
        />
      </div>
    </div>
  );
}