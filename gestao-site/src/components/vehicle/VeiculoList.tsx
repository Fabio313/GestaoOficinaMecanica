import { useEffect, useState } from "react";
import type { Veiculo } from "../../types/Veiculo";
import type { Cliente } from "../../types/Cliente";
import { getVeiculos } from "../../api/veiculoApi";
import { getClientes } from "../../api/clientApi";
import styles from "./VeiculoList.module.css";

type VeiculoListProps = {
  onEdit: (veiculo: Veiculo) => void;
};

export default function VeiculoList({ onEdit }: VeiculoListProps) {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");

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

  const veiculosFiltrados = veiculos.filter(veiculo =>
    [
      veiculo.placa,
      veiculo.modelo,
      veiculo.ano,
      getNomeCliente(veiculo.clienteId)
    ]
      .join(" ")
      .toLowerCase()
      .includes(filtro.toLowerCase())
  );

  return (
    <div className={styles.listContainer}>
      <input
        type="text"
        placeholder="Filtrar veículos"
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
        className={styles.input}
      />
      <ul className={styles.ul}>
        {veiculosFiltrados.map(veiculo => (
          <li key={veiculo.id} className={styles.li}>
            <div className={styles.liContent}>
              <strong>{veiculo.placa}</strong> - {veiculo.modelo} - {veiculo.ano} (Cliente: {getNomeCliente(veiculo.clienteId)})
            </div>
            <button className={styles.editButton} onClick={() => onEdit(veiculo)}>
              Editar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}