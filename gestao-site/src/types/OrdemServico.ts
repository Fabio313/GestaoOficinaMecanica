import type { Servico } from "./Servico";

export type OrdemServico = {
  id?: string;
  clienteId: string;
  veiculoId: string;
  descricaoProblema: string;
  servicos: Servico[];
  status: StatusOrdemServico;
  valorTotal: number;
  valorPago: number;
  dataAbertura: Date;
  dataFechamento?: Date;
}

export const StatusOrdemServico = {
  Aberto: 0,
  EmAndamento: 1,
  Concluido: 2,
  Cancelado: 3
} as const;

export type StatusOrdemServico = typeof StatusOrdemServico[keyof typeof StatusOrdemServico];

export function statusOrdemToString(status: StatusOrdemServico): string {
  const entry = Object.entries(StatusOrdemServico).find(([_, value]) => value === status);
  return entry ? entry[0] : "Desconhecido";
}
