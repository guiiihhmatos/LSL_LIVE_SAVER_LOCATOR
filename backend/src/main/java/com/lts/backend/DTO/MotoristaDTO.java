package com.lts.backend.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
public class MotoristaDTO {
	
	private Long id;
	private String nome;
	private String cpf;
	private String login;
	@JsonIgnore
	private String password;
}
