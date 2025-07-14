import { useState } from "react";
import { criarCliente } from "../api/clientApi";
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
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={e => setNome(e.target.value)}
        required
        className="border p-1"
      />
      <input
        type="text"
        placeholder="Telefone"
        value={telefone}
        onChange={e => setTelefone(e.target.value)}
        required
        className="border p-1"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-2 rounded"
        disabled={loading}
      >
        {loading ? "Adicionando..." : "Adicionar"}
      </button>
    </form>
  );
}