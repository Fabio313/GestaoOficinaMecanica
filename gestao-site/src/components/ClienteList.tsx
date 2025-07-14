import { useEffect, useState } from "react";
import type { Cliente } from "../types/Cliente";
import { getClientes } from "../api/clientApi";

export default function ClienteList() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <ul className="border p-2">
      {clientes.map(cliente => (
        <li key={cliente.id} className="mb-2">
          <strong>{cliente.nome}</strong> - {cliente.telefone}
        </li>
      ))}
    </ul>
  );
}