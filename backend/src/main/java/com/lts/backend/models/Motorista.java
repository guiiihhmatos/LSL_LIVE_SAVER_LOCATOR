package com.lts.backend.models;

import java.util.HashSet;
import java.util.Set;

import org.antlr.v4.runtime.misc.NotNull;

import com.lts.backend.enums.Roles;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "tb_motorista")
public class Motorista {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@Column(name = "nm_motorista")
	private String nome;
	
	@Column(name = "nr_cpf")
	private String cpf;
	
	@Column(nullable = false, name = "ds_login")
	private String login;
	
	@ManyToMany(mappedBy = "motoristas")
    private Set<Ambulancia> ambulancias = new HashSet<>();
	
	@Column(name = "ds_role")
	private Roles role;
	
	@NotNull
	private String password;
}
