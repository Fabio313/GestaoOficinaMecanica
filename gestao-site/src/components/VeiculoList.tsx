import { useEffect, useState } from "react";
import type { Veiculo } from "../types/Veiculo";
import type { Cliente } from "../types/Cliente";
import { getVeiculos } from "../api/veiculoApi";
import { getClientes } from "../api/clientApi";

export default function VeiculoList() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarDados() {
    setLoading(true);
    try {
      const [veiculosData, clientesData] = await Promise.all([
        getVeiculos(),
        getClientes(),
      ]);
      setVeiculos(veiculosData);
      setClientes(clientesData);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  if (loading) return <div>Carregando veículos...</div>;

  function getNomeCliente(clienteId: string) {
    const cliente = clientes.find(c => c.id === clienteId);
    return cliente ? cliente.nome : "Desconhecido";
  }

  return (
    <ul className="border p-2">
      {veiculos.map(veiculo => (
        <li key={veiculo.id} className="mb-2">
          <strong>{veiculo.placa}</strong> - {veiculo.modelo} - {veiculo.ano} (Cliente: {getNomeCliente(veiculo.clienteId)})
        </li>
      ))}
    </ul>
  );
}