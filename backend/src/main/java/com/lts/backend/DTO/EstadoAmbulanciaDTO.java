package com.lts.backend.DTO;

import com.lts.backend.enums.EstadoAmbulancia;

import lombok.Data;

@Data
public class EstadoAmbulanciaDTO {
	
	private Long id;
	private EstadoAmbulancia estadoAmbulancia;
}
