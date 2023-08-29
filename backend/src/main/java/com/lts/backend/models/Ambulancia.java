package com.lts.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lts.backend.enums.EstadoAmbulancia;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "tb_ambulancia")
public class Ambulancia {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "cd_ambulancia")
	private Long id;
	
	@Column(name = "ds_placa")
	private String placa;
	
	@Column(name = "nr_cpf")
	private String cpf;
	
	@Column(name = "ds_estado_ambulancia")
	private EstadoAmbulancia estadoAmbulancia;
	
	@OneToOne
	@JoinColumn(name = "cd_localizacao")
	@JsonIgnore
	private Localizacao localizacao;
	
}
