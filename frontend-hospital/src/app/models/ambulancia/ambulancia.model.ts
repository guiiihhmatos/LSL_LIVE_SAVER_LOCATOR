import { Usuario } from '../usuario/usuario.model';

export interface Ambulancia {
  id: 0;
  placa: string;
  latitude: 0;
  longitude: 0;
  estadoAmbulancia: estadoAmbulancia;
  motoristas: any; /*futuramente classe usuario*/
}

enum estadoAmbulancia {
  OCUPADO, DISPONIVEL, INATIVO
}
