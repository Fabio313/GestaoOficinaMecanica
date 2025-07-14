import { useEffect, useState } from "react";
import { criarVeiculo } from "../api/veiculoApi";
import { getClientes } from "../api/clientApi";
import type { Cliente } from "../types/Cliente";

type VeiculoFormProps = {
  onVeiculoCriado?: () => void;
};

export default function VeiculoForm({ onVeiculoCriado }: VeiculoFormProps) {
  const [clienteId, setClienteId] = useState("");
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    getClientes().then(setClientes);
  }, []);

  const clientesFiltrados = clientes.filter(c =>
    c.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await criarVeiculo({ clienteId, placa, modelo, ano: Number(ano) });
      setClienteId("");
      setPlaca("");
      setModelo("");
      setAno("");
      if (onVeiculoCriado) onVeiculoCriado();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2 flex-wrap">
      <div>
        <input
          type="text"
          placeholder="Filtrar cliente"
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
          className="border p-1 mb-1"
        />
        <select
          value={clienteId}
          onChange={e => setClienteId(e.target.value)}
          required
          className="border p-1"
        >
          <option value="">Selecione o cliente</option>
          {clientesFiltrados.map(cliente => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        placeholder="Placa"
        value={placa}
        onChange={e => setPlaca(e.target.value)}
        required
        className="border p-1"
      />
      <input
        type="text"
        placeholder="Modelo"
        value={modelo}
        onChange={e => setModelo(e.target.value)}
        required
        className="border p-1"
      />
      <input
        type="number"
        placeholder="Ano"
        value={ano}
        onChange={e => setAno(e.target.value === "" ? "" : Number(e.target.value))}
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