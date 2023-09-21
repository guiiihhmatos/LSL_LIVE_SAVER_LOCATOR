package com.lts.backend.models;

import java.util.HashSet;
import java.util.Set;

import com.lts.backend.enums.EstadoAmbulancia;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
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
	
	@Column(name = "latitude")
	private Long latitude;
	
	@Column(name = "longitude")
	private Long longitude;

	@Column(name = "ds_estado_ambulancia")
	private EstadoAmbulancia estadoAmbulancia;
	
	@ManyToMany
    @JoinTable(
        name = "motorista_ambulancia",
        joinColumns = @JoinColumn(name = "ambulancia_id"),
        inverseJoinColumns = @JoinColumn(name = "motorista_id")
    )
    private Set<Motorista> motoristas = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "chamado_id")
    private Chamado chamado;
	
}
