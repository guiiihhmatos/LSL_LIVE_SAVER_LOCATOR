import { Ambulancia } from '../ambulancia/ambulancia.model';

export interface Chamado {
  id: number;
  ocorrencia: string;
  estadoChamado: EstadosChamado;
  localChamado: LocalChamado;
  tipoEmergencia: TiposEmergencia;
  dataInicioChamado: Date;
  dataFimChamado?: Date;
  ambulancias: Ambulancia[];
}

export interface formChamado {
  id: number;
  ocorrencia: string;
  estadoChamado: EstadosChamado;
  localChamado: {
    id: number;
    endereco: string;
    bairro: string;
    numero: number;
    cidade: string;
    estado: string;
    cep: string;
  };
  tipoEmergencia: TiposEmergencia;
  ambulanciasIds: number[];
}

export enum EstadosChamado {
  A_CAMINHO,
  RETORNANDO,
  FINALIZADO,
}

export enum TiposEmergencia {
  URGENTE,
  MUITO_URGENTE,
  GRAVE,
}

export interface LocalChamado {
  id: number;
  endereco: string;
  bairro: string;
  numero: number;
  cidade: string;
  estado: string;
  cep: string;
  chamado: string;
}
