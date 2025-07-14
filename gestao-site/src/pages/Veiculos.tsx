import { useState } from "react";
import VeiculoForm from "../components/VeiculoForm";
import VeiculoList from "../components/VeiculoList";

export default function Veiculos() {
  const [atualizar, setAtualizar] = useState(false);

  function handleVeiculoCriado() {
    setAtualizar(a => !a);
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Veículos</h1>
      <VeiculoForm onVeiculoCriado={handleVeiculoCriado} />
      <VeiculoList key={String(atualizar)} />
    </div>
  );
}