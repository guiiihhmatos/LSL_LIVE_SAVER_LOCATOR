package com.lts.backend.models;

import com.lts.backend.enums.EstadoAmbulancia;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

	@Column(name = "ds_estado_ambulancia")
	private EstadoAmbulancia estadoAmbulancia;
	
}
