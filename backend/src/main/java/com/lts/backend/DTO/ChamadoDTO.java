package com.lts.backend.DTO;

import com.lts.backend.enums.EstadoChamado;
import com.lts.backend.enums.TipoEmergencia;

import lombok.Data;


@Data
public class ChamadoDTO {
		
		private Long id;
		private LocalizacaoAmbulanciaDTO localizacaoAmbulancia;
		private String ocorrencia;
		private EstadoChamado estadoChamado;	
		private LocalChamadoDTO localChamado;
		private TipoEmergencia tipoEmergencia;
}
