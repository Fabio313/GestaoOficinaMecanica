import { useState } from "react";
import { criarCliente } from "../../api/clientApi";
import styles from "./ClienteForm.module.css";

type ClienteFormProps = {
  onClienteCriado?: () => void;
};

export default function ClienteForm({ onClienteCriado }: ClienteFormProps) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await criarCliente({ nome, telefone });
      setNome("");
      setTelefone("");
      if (onClienteCriado) onClienteCriado();
    } finally {
      setLoading(false);
    }
  }

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
      <button
        type="submit"
        className={styles.button}
        disabled={loading}
      >
        {loading ? "Adicionando..." : "Adicionar"}
      </button>
    </form>
  );
}