package com.lts.backend.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
public class LocalChamadoDTO {

	private Long id;
	private String rua;
	private String bairro;
	private Integer numero;
	private String cidade;
	private String estado;
	private String cep;
	@JsonIgnore
    private ChamadoDTO Chamado;
}
