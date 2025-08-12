import http from "./httpClient";
import type { Veiculo } from "../types/Veiculo";

export async function getVeiculos(): Promise<Veiculo[]> {
  const response = await http.get("/veiculos");
  return response.data;
}

export async function criarVeiculo(veiculo: Veiculo) {
  return http.post("/veiculos", veiculo);
}

export async function atualizarVeiculo(veiculo: Veiculo) {
  return http.put(`/veiculos/${veiculo.id}`, veiculo);
}