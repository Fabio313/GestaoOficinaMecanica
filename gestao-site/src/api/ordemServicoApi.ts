import http from "./httpClient";
import type { OrdemServico } from "../types/OrdemServico";

export async function getOrdensServico(): Promise<OrdemServico[]> {
  const response = await http.get("/ordensservico");
  return response.data;
}

export async function criarOrdemServico(ordem: OrdemServico) {
  return http.post("/ordensservico", ordem);
}