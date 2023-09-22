package com.lts.backend.models;


import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@Data
@MappedSuperclass
public abstract class Usuario {
	
	private String nome;
	
	@Column(name = "nr_cpf")
	private String cpf;
	
	@Column(nullable = false, name = "ds_login")
	private String login;
	
	
	@Column(nullable = false, name = "ds_senha")
	private String password;
}