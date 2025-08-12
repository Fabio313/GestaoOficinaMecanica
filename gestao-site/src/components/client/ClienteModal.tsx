import type { Cliente } from "../../types/Cliente";
import ClienteForm from "./ClienteForm";
import styles from "../ordemServico/ServicoModal.module.css";

type ClienteModalProps = {
  open: boolean;
  clienteParaEditar: Cliente | null;
  onClose: () => void;
  onSuccess: () => void;
};

export default function ClienteModal({
  open,
  clienteParaEditar,
  onClose,
  onSuccess,
}: ClienteModalProps) {
  if (!open) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>
          {clienteParaEditar ? "Editar Cliente" : "Adicionar Cliente"}
        </h2>
        <ClienteForm
          clienteParaEditar={clienteParaEditar}
          onSuccess={onSuccess}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
