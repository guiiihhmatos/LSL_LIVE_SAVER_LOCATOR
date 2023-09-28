package com.lts.backend.DTO;

import com.lts.backend.enums.Roles;

import lombok.Data;

@Data
public class UsuarioDTO {
	
	private Long id;
	private String nome;
	private String cpf;
	private Roles role;
	private String login;
	private String password;
}
