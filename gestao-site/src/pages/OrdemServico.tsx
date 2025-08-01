import { useState } from "react";
import OrdemServicoForm from "../components/OrdemServicoForm";
import OrdemServicoList from "../components/OrdemServicoList";

export default function OrdensServico() {
  const [atualizar, setAtualizar] = useState(false);

  function handleOrdemCriada() {
    setAtualizar(a => !a);
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Ordens de Serviço</h1>
      <OrdemServicoForm onOrdemCriada={handleOrdemCriada} />
      <OrdemServicoList key={String(atualizar)} />
    </div>
  );
}