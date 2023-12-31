package com.lts.backend.DTO;

import java.util.List;

import com.lts.backend.enums.EstadoChamado;
import com.lts.backend.enums.TipoEmergencia;

import lombok.Data;


@Data
public class ChamadoDTO {
		
		private Long id;
		private String ocorrencia;
		private EstadoChamado estadoChamado;	
		private LocalChamadoDTO localChamado;
		private TipoEmergencia tipoEmergencia;
		private List<Long> ambulanciaIds;
}
