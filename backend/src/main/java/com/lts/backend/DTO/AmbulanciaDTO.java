package com.lts.backend.DTO;

import com.lts.backend.enums.EstadoAmbulancia;

import lombok.Data;

@Data
public class AmbulanciaDTO {
	private Long id;
	private String placa;
	private Long latitude;
	private Long longitude;
	private EstadoAmbulancia estadoAmbulancia;
}
