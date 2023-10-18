package com.lts.backend.DTO;

import java.math.BigDecimal;

import com.lts.backend.enums.EstadoAmbulancia;

import lombok.Data;

@Data
public class AmbulanciaDTO {
	private Long id;
	private String placa;
	private BigDecimal latitude;
	private BigDecimal longitude;
	private EstadoAmbulancia estadoAmbulancia;
}
