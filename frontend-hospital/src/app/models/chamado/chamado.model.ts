import { Ambulancia } from "../ambulancia/ambulancia.model";

export interface Chamado {
  id: number;
  ocorrencia: string;
  estadoChamado: EstadosChamado;
  localChamado: LocalChamado;
  tipoEmergencia: TiposEmergencia;
  ambulancias: Ambulancia[];
}

export enum EstadosChamado {
  A_CAMINHO, RETORNANDO, FINALIZADO
}

export enum TiposEmergencia {
  URGENTE, MUITO_URGENTE, GRAVE
}

export interface LocalChamado {
  id: number;
  rua: string;
  bairro: string;
  numero: number;
  cidade: string;
  estado: string;
  cep: string;
  chamado: string;
}
