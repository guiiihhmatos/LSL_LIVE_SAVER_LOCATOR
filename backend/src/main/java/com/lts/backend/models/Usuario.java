package com.lts.backend.models;


import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@Data
@MappedSuperclass
public abstract class Usuario implements UserDetails{
	
	private String nome;
	
	@Column(name = "nr_cpf")
	private String cpf;
	
	@Column(nullable = false, name = "ds_login")
	private String login;
	
	
	@Column(nullable = false, name = "ds_senha")
	private String password;
}
