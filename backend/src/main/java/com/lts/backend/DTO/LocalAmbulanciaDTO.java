package com.lts.backend.DTO;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class LocalAmbulanciaDTO {
	
	private Long id;
	private BigDecimal latitude;
	private BigDecimal longitude;
}
