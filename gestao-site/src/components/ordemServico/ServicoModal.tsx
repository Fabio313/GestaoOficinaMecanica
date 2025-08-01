import type { Servico } from "../../types/Servico";
import styles from "./ServicoModal.module.css";

type ServicoModalProps = {
  open: boolean;
  servico: Servico;
  onChange: (servico: Servico) => void;
  onClose: () => void;
  onAdd: () => void;
};

export default function ServicoModal({
  open,
  servico,
  onChange,
  onClose,
  onAdd,
}: ServicoModalProps) {
  if (!open) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Adicionar Serviço</h2>
        <div>
          <label className={styles.label} htmlFor="nome">
            Nome
          </label>
          <input
            id="nome"
            type="text"
            placeholder="Nome"
            value={servico.nome}
            onChange={(e) => onChange({ ...servico, nome: e.target.value })}
            className={styles.input}
            required
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="descricao">
            Descrição
          </label>
          <input
            id="descricao"
            type="text"
            placeholder="Descrição"
            value={servico.descricao}
            onChange={(e) =>
              onChange({ ...servico, descricao: e.target.value })
            }
            className={styles.input}
            required
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="preco">
            Preço
          </label>
          <input
            id="preco"
            type="number"
            placeholder="Preço"
            value={servico.preco}
            onChange={(e) =>
              onChange({ ...servico, preco: Number(e.target.value) })
            }
            className={styles.input}
            min={0}
            required
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="quantidade">
            Quantidade
          </label>
          <input
            id="quantidade"
            type="number"
            placeholder="Quantidade"
            value={servico.quantidade}
            onChange={(e) =>
              onChange({ ...servico, quantidade: Number(e.target.value) })
            }
            className={styles.input}
            min={1}
            required
          />
        </div>
        <div className={styles.buttonRow}>
          <button
            type="button"
            className={`${styles.button} ${styles.cancel}`}
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={onAdd}
            disabled={
              !servico.nome ||
              !servico.descricao ||
              servico.preco <= 0 ||
              servico.quantidade <= 0
            }
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
