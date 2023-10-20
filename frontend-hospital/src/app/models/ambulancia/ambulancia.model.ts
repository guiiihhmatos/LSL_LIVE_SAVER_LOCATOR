import { Usuario } from '../usuario/usuario.model';

export interface Ambulancia {
  id: 0;
  placa: string;
  latitude: 0;
  longitude: 0;
  estadoAmbulancia: EstadosAmbulancia;
  motoristas?: any; /*futuramente classe usuario*/
}

export enum EstadosAmbulancia {
  OCUPADO, DISPONIVEL, INATIVO
}
