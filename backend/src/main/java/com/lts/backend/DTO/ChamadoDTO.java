package com.lts.backend.DTO;

import com.lts.backend.enums.EstadoChamado;
import com.lts.backend.enums.TipoEmergencia;
import com.lts.backend.models.Ambulancia;
import com.lts.backend.models.LocalChamado;

import lombok.Data;


@Data
public class ChamadoDTO {
		
		private Long id;
		private LocalizacaoAmbulanciaDTO localizacaoAmbulancia;
		private String ocorrencia;
		private EstadoChamado estadoChamado;	
		private LocalChamado localChamado;
		private TipoEmergencia tipoEmergencia;
		private Ambulancia ambulancia;
}
