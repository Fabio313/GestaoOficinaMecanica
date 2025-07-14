import type { Servico } from "./Servico";

export type OrdemServico = {
  id?: string;
  clienteId: string;
  veiculoId: string;
  descricaoProblema: string;
  servicos: Servico[];
  status: "Aberto" | "EmAndamento" | "Concluido" | "Cancelado";
  valorTotal: number;
  valorPago: number;
  dataAbertura: Date;
  dataFechamento?: Date;
}
