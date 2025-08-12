import { useEffect, useState } from "react";
import {
  criarOrdemServico,
  atualizarOrdemServico,
} from "../../api/ordemServicoApi";
import { getVeiculos } from "../../api/veiculoApi";
import type { Veiculo } from "../../types/Veiculo";
import {
  StatusOrdemServico,
  type OrdemServico,
} from "../../types/OrdemServico";
import type { Servico } from "../../types/Servico";
import styles from "./OrdemServicoForm.module.css";
import ServicoModal from "./ServicoModal";

type OrdemServicoFormProps = {
  osParaEditar?: OrdemServico | null;
  onSuccess: () => void;
  onClose?: () => void;
};

export default function OrdemServicoForm({
  osParaEditar,
  onSuccess,
  onClose,
}: OrdemServicoFormProps) {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [veiculoId, setVeiculoId] = useState("");
  const [descricaoProblema, setDescricaoProblema] = useState("");
  const [status, setStatus] =
    useState<keyof typeof StatusOrdemServico>("Aberto");
  const [servicosSelecionados, setServicosSelecionados] = useState<Servico[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [novoServico, setNovoServico] = useState<Servico>({
    nome: "",
    descricao: "",
    preco: 0,
    quantidade: 1,
  });

  useEffect(() => {
    async function carregarVeiculos() {
      const data = await getVeiculos();
      setVeiculos(data);
    }
    carregarVeiculos();

    if (osParaEditar) {
      setVeiculoId(osParaEditar.veiculoId);
      setDescricaoProblema(osParaEditar.descricaoProblema);
      const statusKey = Object.keys(StatusOrdemServico).find(
        (key) =>
          StatusOrdemServico[key as keyof typeof StatusOrdemServico] ===
          osParaEditar.status
      );
      if (statusKey) setStatus(statusKey as keyof typeof StatusOrdemServico);
      setServicosSelecionados(osParaEditar.servicos);
    } else {
      setVeiculoId("");
      setDescricaoProblema("");
      setStatus("Aberto");
      setServicosSelecionados([]);
    }
  }, [osParaEditar]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (!veiculoId || !descricaoProblema) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      setLoading(false);
      return;
    }

    try {
      const os = {
        clienteId: veiculoId
          ? veiculos.find((v) => v.id === veiculoId)?.clienteId || ""
          : "",
        veiculoId,
        descricaoProblema,
        servicos: servicosSelecionados,
        status: StatusOrdemServico[status],
        valorTotal: servicosSelecionados.reduce(
          (total, s) => total + s.preco * s.quantidade,
          0
        ),
        dataAbertura: osParaEditar?.dataAbertura || new Date(),
        valorPago: osParaEditar?.valorPago || 0,
      };

      if (osParaEditar) {
        await atualizarOrdemServico({ ...osParaEditar, ...os });
      } else {
        await criarOrdemServico(os);
      }

      onSuccess();
      if (onClose) onClose();
    } finally {
      setLoading(false);
    }
  }

  function handleAddServico() {
    setServicosSelecionados([...servicosSelecionados, novoServico]);
    setNovoServico({
      nome: "",
      descricao: "",
      preco: 0,
      quantidade: 1,
    });
    setShowModal(false);
  }
  function handleRemoveServico(idx: number) {
    setServicosSelecionados(servicosSelecionados.filter((_, i) => i !== idx));
  }

  const isEditing = !!osParaEditar;

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div>
        <label htmlFor="veiculoId" className={styles.label}>
          Veículo
        </label>
        <select
          id="veiculoId"
          value={veiculoId}
          onChange={(e) => setVeiculoId(e.target.value)}
          className={styles.select}
          required
        >
          <option value="">Selecione um veículo</option>
          {veiculos.map((v) => (
            <option key={v.id} value={v.id}>
              {v.placa} - {v.modelo}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="descricaoProblema" className={styles.label}>
          Descrição do Problema
        </label>
        <textarea
          id="descricaoProblema"
          placeholder="Descreva o problema do veículo"
          value={descricaoProblema}
          onChange={(e) => setDescricaoProblema(e.target.value)}
          required
          className={styles.textarea}
        />
      </div>

      <div className={styles.servicosContainer}>
        <h3>Serviços Adicionados</h3>
        <button type="button" onClick={() => setShowModal(true)}>
          Adicionar Serviço
        </button>
        <ul>
          {servicosSelecionados.map((servico, idx) => (
            <li key={idx}>
              <strong>{servico.nome}</strong> | R$ {servico.preco} x{" "}
              {servico.quantidade} <br />
              <span>{servico.descricao}</span>
              <button type="button" onClick={() => handleRemoveServico(idx)}>
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <label htmlFor="status" className={styles.label}>
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as keyof typeof StatusOrdemServico)
          }
          className={styles.select}
        >
          {Object.keys(StatusOrdemServico).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
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
        <button type="submit" className={styles.button} disabled={loading}>
          {loading
            ? "Salvando..."
            : isEditing
            ? "Salvar Alterações"
            : "Adicionar"}
        </button>
      </div>

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
