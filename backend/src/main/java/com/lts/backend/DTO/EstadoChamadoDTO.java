package com.lts.backend.DTO;

import com.lts.backend.enums.EstadoChamado;

import lombok.Data;

@Data
public class EstadoChamadoDTO {
	
	private Long id;
	private EstadoChamado estadoChamado;
}
