import { useEffect, useState } from "react";
import type { Cliente } from "../../types/Cliente";
import { getClientes } from "../../api/clientApi";
import styles from "./ClienteList.module.css";

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
    <div className={styles.listContainer}>
      <input
        type="text"
        placeholder="Filtrar clientes"
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
        className={styles.input}
      />
      <ul className={styles.ul}>
        {clientesFiltrados.map(cliente => (
          <li key={cliente.id} className={styles.li}>
            <strong>{cliente.nome}</strong> - {cliente.telefone}
          </li>
        ))}
      </ul>
    </div>
  );
}