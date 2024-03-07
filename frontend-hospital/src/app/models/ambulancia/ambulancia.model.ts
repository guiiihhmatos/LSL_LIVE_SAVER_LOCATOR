import { Usuario } from '../usuario/usuario.model';

export interface Ambulancia {
  id: number;
  placa: string;
  latitude: number;
  longitude: number;
  estadoAmbulancia: EstadosAmbulancia | string;
  motorista?: any; /*futuramente classe usuario*/
}

export enum EstadosAmbulancia {
  OCUPADO, DISPONIVEL, INATIVO
}
