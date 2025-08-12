import { useEffect, useState } from "react";
import { criarVeiculo, atualizarVeiculo } from "../../api/veiculoApi";
import { getClientes } from "../../api/clientApi";
import type { Cliente } from "../../types/Cliente";
import type { Veiculo } from "../../types/Veiculo";
import styles from "./VeiculoForm.module.css";

type VeiculoFormProps = {
  veiculoParaEditar?: Veiculo | null;
  onSuccess: () => void;
  onClose?: () => void;
};

export default function VeiculoForm({ veiculoParaEditar, onSuccess, onClose }: VeiculoFormProps) {
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

  useEffect(() => {
    if (veiculoParaEditar) {
      setClienteId(veiculoParaEditar.clienteId);
      setPlaca(veiculoParaEditar.placa);
      setModelo(veiculoParaEditar.modelo);
      setAno(veiculoParaEditar.ano);
    } else {
      setClienteId("");
      setPlaca("");
      setModelo("");
      setAno("");
    }
  }, [veiculoParaEditar]);

  const clientesFiltrados = clientes.filter(c =>
    c.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (veiculoParaEditar) {
        await atualizarVeiculo({
          id: veiculoParaEditar.id,
          clienteId,
          placa,
          modelo,
          ano: Number(ano),
        });
      } else {
        await criarVeiculo({ clienteId, placa, modelo, ano: Number(ano) });
      }
      onSuccess();
      if (onClose) onClose();
    } finally {
      setLoading(false);
    }
  }

  const isEditing = !!veiculoParaEditar;
  const isFormValid = clienteId !== "" && placa.trim() !== "" && modelo.trim() !== "" && ano !== "" && Number(ano) > 0;
  
  const isFormUnchanged = isEditing &&
    clienteId === veiculoParaEditar?.clienteId &&
    placa === veiculoParaEditar?.placa &&
    modelo === veiculoParaEditar?.modelo &&
    Number(ano) === veiculoParaEditar?.ano;

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div>
        <label htmlFor="filtro" className={styles.label}>Filtrar cliente</label>
        <input
          id="filtro"
          type="text"
          placeholder="Filtrar cliente"
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
          className={styles.input}
        />
        <label htmlFor="cliente" className={styles.label}>Cliente</label>
        <select
          id="cliente"
          value={clienteId}
          onChange={e => setClienteId(e.target.value)}
          required
          className={styles.input}
        >
          <option value="">Selecione o cliente</option>
          {clientesFiltrados.map(cliente => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="placa" className={styles.label}>Placa</label>
        <input
          id="placa"
          type="text"
          placeholder="Placa"
          value={placa}
          onChange={e => setPlaca(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div>
        <label htmlFor="modelo" className={styles.label}>Modelo</label>
        <input
          id="modelo"
          type="text"
          placeholder="Modelo"
          value={modelo}
          onChange={e => setModelo(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div>
        <label htmlFor="ano" className={styles.label}>Ano</label>
        <input
          id="ano"
          type="number"
          placeholder="Ano"
          value={ano}
          onChange={e => setAno(e.target.value === "" ? "" : Number(e.target.value))}
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