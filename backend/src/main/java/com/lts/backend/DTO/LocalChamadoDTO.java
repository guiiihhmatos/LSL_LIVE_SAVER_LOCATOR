package com.lts.backend.DTO;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
public class LocalChamadoDTO {

	private Long id;
	private String endereco;
	private String bairro;
	private Integer numero;
	private String cidade;
	private String estado;
	private String cep;
	private BigDecimal latitude;
	private BigDecimal longitude;
	@JsonIgnore
    private ChamadoDTO Chamado;
}
