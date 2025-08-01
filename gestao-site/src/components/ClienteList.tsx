import { useEffect, useState } from "react";
import type { Cliente } from "../types/Cliente";
import { getClientes } from "../api/clientApi";

export default function ClienteList() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");

  async function carregarClientes() {
    setLoading(true);
    try {
      const data = await getClientes();
      setClientes(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarClientes();
  }, []);

  if (loading) return <div>Carregando clientes...</div>;

  const clientesFiltrados = clientes.filter(cliente =>
    [cliente.nome, cliente.telefone]
      .join(" ")
      .toLowerCase()
      .includes(filtro.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar clientes"
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
        className="border p-1 mb-2 w-full"
      />
      <ul className="border p-2">
        {clientesFiltrados.map(cliente => (
          <li key={cliente.id} className="mb-2">
            <strong>{cliente.nome}</strong> - {cliente.telefone}
          </li>
        ))}
      </ul>
    </div>
  );
}