import { useState, useEffect } from "react";
import type { Cliente } from "../../types/Cliente";
import { criarCliente, atualizarCliente } from "../../api/clientApi";
import styles from "./ClienteForm.module.css";

type ClienteFormProps = {
  clienteParaEditar?: Cliente | null;
  onSuccess: () => void;
  onClose?: () => void;
};

export default function ClienteForm({ clienteParaEditar, onSuccess, onClose }: ClienteFormProps) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (clienteParaEditar) {
      setNome(clienteParaEditar.nome);
      setTelefone(clienteParaEditar.telefone);
    } else {
      setNome("");
      setTelefone("");
    }
  }, [clienteParaEditar]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (clienteParaEditar) {
        await atualizarCliente({ ...clienteParaEditar, nome, telefone });
      } else {
        await criarCliente({ nome, telefone });
      }
      onSuccess();
      if (onClose) onClose();
    } finally {
      setLoading(false);
    }
  }

  const isEditing = !!clienteParaEditar;
  const isFormValid = nome.trim() !== "" && telefone.trim() !== "";
  const isFormUnchanged = isEditing && nome === clienteParaEditar?.nome && telefone === clienteParaEditar?.telefone;

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div>
        <label htmlFor="nome" className={styles.label}>Nome</label>
        <input
          id="nome"
          type="text"
          placeholder="Digite o nome do cliente"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div>
        <label htmlFor="telefone" className={styles.label}>Telefone</label>
        <input
          id="telefone"
          type="text"
          placeholder="Digite o telefone"
          value={telefone}
          onChange={e => setTelefone(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.buttonRow}>
        {onClose && (
          <button
            type="button"
            className={`${styles.button} ${styles.cancel}`}
            onClick={onClose}
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className={styles.button}
          disabled={loading || !isFormValid || isFormUnchanged}
        >
          {loading ? "Salvando..." : (isEditing ? "Salvar Alterações" : "Adicionar")}
        </button>
      </div>
    </form>
  );
}