package com.lts.backend.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
public class LocalizacaoAmbulanciaDTO {
	private String latitude;
	private String longitude;
	@JsonIgnore
    private AmbulanciaDTO ambulancia;
}
