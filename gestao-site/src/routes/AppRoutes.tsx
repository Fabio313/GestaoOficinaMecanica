import { BrowserRouter, Routes, Route } from "react-router-dom";
import Clientes from "../pages/Clientes";
import Veiculos from "../pages/Veiculos";
import OrdensServico from "../pages/OrdemServico";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>  
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/veiculos" element={<Veiculos />} />
        <Route path="/ordens-servico" element={<OrdensServico />} />
        <Route path="*" element={<div>Página não encontrada</div>} />
      </Routes> 
    </BrowserRouter>
  );
}