import { useEffect, useState } from "react";
import {
  statusOrdemToString,
  type OrdemServico,
} from "../../types/OrdemServico";
import { getOrdensServico } from "../../api/ordemServicoApi";
import { getVeiculos } from "../../api/veiculoApi";
import { getClientes } from "../../api/clientApi";
import type { Veiculo } from "../../types/Veiculo";
import type { Cliente } from "../../types/Cliente";
import styles from "./OrdemServicoList.module.css";

type OrdemServicoListProps = {
  onEdit: (os: OrdemServico) => void;
};

export default function OrdemServicoList({ onEdit }: OrdemServicoListProps) {
  const [ordens, setOrdens] = useState<OrdemServico[]>([]);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");

  async function carregarDados() {
    setLoading(true);
    try {
      const [ordensData, veiculosData, clientesData] = await Promise.all([
        getOrdensServico(),
        getVeiculos(),
        getClientes(),
      ]);
      setOrdens(ordensData);
      setVeiculos(veiculosData);
      setClientes(clientesData);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  if (loading) return <div>Carregando ordens de serviço...</div>;

  const getVeiculoInfo = (veiculoId: string) => {
    const veiculo = veiculos.find((v) => v.id === veiculoId);
    if (!veiculo) return "N/A";
    const cliente = clientes.find((c) => c.id === veiculo.clienteId);
    return `${veiculo.placa} (${veiculo.modelo}) - ${cliente?.nome || "N/A"}`;
  };

  const ordensFiltradas = ordens.filter((ordem) => {
    const veiculo = veiculos.find((v) => v.id === ordem.veiculoId);
    const cliente = veiculo
      ? clientes.find((c) => c.id === veiculo.clienteId)
      : undefined;
    const texto = [
      ordem.descricaoProblema,
      statusOrdemToString(ordem.status),
      veiculo?.placa,
      veiculo?.modelo,
      cliente?.nome,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return texto.includes(filtro.toLowerCase());
  });

  return (
    <div className={styles.listContainer}>
      <input
        type="text"
        placeholder="Filtrar ordens de serviço"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className={styles.input}
      />
      <ul className={styles.ul}>
        {ordensFiltradas.map((ordem) => (
          <li key={ordem.id} className={styles.li}>
            <div>
              <strong>Veículo:</strong> {getVeiculoInfo(ordem.veiculoId)}
              <br />
              <strong>Problema:</strong> {ordem.descricaoProblema}
              <br />
              <strong>Status:</strong> {statusOrdemToString(ordem.status)}
              <br />
              <strong>Valor Total:</strong> R$ {ordem.valorTotal.toFixed(2)}
              <br />
              <strong>Valor Pago:</strong> R$ {ordem.valorPago.toFixed(2)}
            </div>
            <button
              type="button"
              className={styles.editButton}
              onClick={() => onEdit(ordem)}
            >
              Editar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
