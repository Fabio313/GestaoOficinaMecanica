import { useEffect, useState } from "react";
import { criarOrdemServico } from "../../api/ordemServicoApi";
import { getVeiculos } from "../../api/veiculoApi";
import type { Veiculo } from "../../types/Veiculo";
import { StatusOrdemServico } from "../../types/OrdemServico";
import type { Servico } from "../../types/Servico";
import styles from "./OrdemServicoForm.module.css";
import ServicoModal from "./ServicoModal";

type OrdemServicoFormProps = {
  onOrdemCriada?: () => void;
};

export default function OrdemServicoForm({
  onOrdemCriada,
}: OrdemServicoFormProps) {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [filtro, setFiltro] = useState("");
  const [veiculoId, setVeiculoId] = useState("");
  const [descricaoProblema, setDescricaoProblema] = useState("");
  const [status, setStatus] =
    useState<keyof typeof StatusOrdemServico>("Aberto");
  const [loading, setLoading] = useState(false);
  const [servicosSelecionados, setServicosSelecionados] = useState<Servico[]>(
    []
  );
  const [showModal, setShowModal] = useState(false);
  const [novoServico, setNovoServico] = useState<Servico>({
    nome: "",
    descricao: "",
    preco: 0,
    quantidade: 1,
  });

  useEffect(() => {
    getVeiculos().then(setVeiculos);
  }, []);

  const veiculosFiltrados = veiculos.filter(
    (v) =>
      v.placa.toLowerCase().includes(filtro.toLowerCase()) ||
      v.modelo.toLowerCase().includes(filtro.toLowerCase())
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const veiculo = veiculos.find((v) => v.id === veiculoId);
      if (!veiculo) return;
      await criarOrdemServico({
        clienteId: veiculo.clienteId,
        veiculoId: veiculo.id!,
        descricaoProblema,
        servicos: servicosSelecionados,
        status: StatusOrdemServico[status],
        valorTotal: servicosSelecionados.reduce(
          (acc, s) => acc + s.preco * s.quantidade,
          0
        ),
        valorPago: 0,
        dataAbertura: new Date(),
      });
      setVeiculoId("");
      setDescricaoProblema("");
      setStatus("Aberto");
      setServicosSelecionados([]);
      if (onOrdemCriada) onOrdemCriada();
    } finally {
      setLoading(false);
    }
  }

  function handleAddServico() {
    setServicosSelecionados([...servicosSelecionados, novoServico]);
    setNovoServico({ nome: "", descricao: "", preco: 0, quantidade: 1 });
    setShowModal(false);
  }

  function handleRemoveServico(idx: number) {
    setServicosSelecionados(servicosSelecionados.filter((_, i) => i !== idx));
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div>
        <input
          type="text"
          placeholder="Filtrar veículo (placa/modelo)"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className={styles.input}
        />
        <select
          value={veiculoId}
          onChange={(e) => setVeiculoId(e.target.value)}
          required
          className={styles.select}
        >
          <option value="">Selecione o veículo</option>
          {veiculosFiltrados.map((v) => (
            <option key={v.id} value={v.id}>
              {v.placa} - {v.modelo}
            </option>
          ))}
        </select>
      </div>
      <div>
        <textarea
          placeholder="Descrição do problema"
          value={descricaoProblema}
          onChange={(e) => setDescricaoProblema(e.target.value)}
          required
          className={styles.textarea}
        />
      </div>

      <div>
        <button
          type="button"
          className={styles.button}
          onClick={() => setShowModal(true)}
        >
          Adicionar Serviço
        </button>
        <ul>
          {servicosSelecionados.map((servico, idx) => (
            <li key={idx} style={{ marginBottom: "8px" }}>
              <strong>{servico.nome}</strong> - {servico.descricao} | Qtd:{" "}
              {servico.quantidade} | R$ {servico.preco}
              <button
                type="button"
                style={{
                  marginLeft: "8px",
                  color: "#d90429",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => handleRemoveServico(idx)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value as keyof typeof StatusOrdemServico)
        }
        className={styles.select}
      >
        <option value="Aberto">Aberto</option>
        <option value="EmAndamento">Em Andamento</option>
        <option value="Concluido">Concluído</option>
        <option value="Cancelado">Cancelado</option>
      </select>
      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? "Adicionando..." : "Adicionar"}
      </button>

      <ServicoModal
        open={showModal}
        servico={novoServico}
        onChange={setNovoServico}
        onClose={() => setShowModal(false)}
        onAdd={handleAddServico}
      />
    </form>
  );
}
