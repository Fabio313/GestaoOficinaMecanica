import { BrowserRouter, Routes, Route } from "react-router-dom";
import Clientes from "../pages/Clientes";
import Veiculos from "../pages/Veiculos";
// Importe outras páginas conforme necessário

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>  
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/veiculos" element={<Veiculos />} />
        <Route path="*" element={<div>Página não encontrada</div>} />
      </Routes> 
    </BrowserRouter>
  );
}