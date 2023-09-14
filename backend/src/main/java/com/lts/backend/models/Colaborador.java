package com.lts.backend.models;

import org.antlr.v4.runtime.misc.NotNull;

import com.lts.backend.enums.Roles;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "tb_colaborador")
public class Colaborador {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@Column(name = "nm_usuario")
	private String nome;
	
	@Column(name = "nr_cpf")
	private String cpf;
	
	@Column(nullable = false, name = "ds_login")
	private String login;
	
	@Column(name = "ds_role")
	private Roles role;
	
	@NotNull
	private String password;
}
