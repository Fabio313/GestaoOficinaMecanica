import { useState } from "react";
import ClienteForm from "../components/ClienteForm";
import ClienteList from "../components/ClienteList";

export default function Clientes() {
  const [atualizar, setAtualizar] = useState(false);

  function handleClienteCriado() {
    setAtualizar((a) => !a)
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Clientes</h1>
      <ClienteForm onClienteCriado={handleClienteCriado} />
      <ClienteList key={String(atualizar)} />
    </div>
  );
}
