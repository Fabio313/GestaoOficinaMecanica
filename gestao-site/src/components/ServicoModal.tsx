import type { Servico } from "../types/Servico";

type ServicoModalProps = {
  open: boolean;
  servico: Servico;
  onChange: (servico: Servico) => void;
  onClose: () => void;
  onAdd: () => void;
};

export default function ServicoModal({ open, servico, onChange, onClose, onAdd }: ServicoModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg min-w-[300px]">
        <h2 className="text-lg font-bold mb-2">Adicionar Serviço</h2>
        <input
          type="text"
          placeholder="Nome"
          value={servico.nome}
          onChange={e => onChange({ ...servico, nome: e.target.value })}
          className="border p-1 mb-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={servico.descricao}
          onChange={e => onChange({ ...servico, descricao: e.target.value })}
          className="border p-1 mb-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={servico.preco}
          onChange={e => onChange({ ...servico, preco: Number(e.target.value) })}
          className="border p-1 mb-2 w-full"
          min={0}
          required
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={servico.quantidade}
          onChange={e => onChange({ ...servico, quantidade: Number(e.target.value) })}
          className="border p-1 mb-2 w-full"
          min={1}
          required
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="bg-gray-300 px-2 py-1 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={onAdd}
            disabled={
              !servico.nome ||
              !servico.descricao ||
              servico.preco <= 0 ||
              servico.quantidade <= 0
            }
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}