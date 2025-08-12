import http from "./httpClient";
import type { Cliente } from "../types/Cliente";

export async function getClientes(): Promise<Cliente[]> {
  const response = await http.get("/clientes");
  return response.data;
}

export async function criarCliente(cliente: Cliente) {
  return http.post("/clientes", cliente);
}

export async function atualizarCliente(cliente: Cliente) {
  return http.put(`/clientes/${cliente.id}`, cliente);
}
    