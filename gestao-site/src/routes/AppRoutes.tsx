import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Clientes from "../pages/client/Clientes";
import Veiculos from "../pages/veiculo/Veiculos";
import OrdensServico from "../pages/ordemServico/OrdemServico";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/veiculos" element={<Veiculos />} />
        <Route path="/ordens-servico" element={<OrdensServico />} />
        <Route path="*" element={<div>Página não encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
}