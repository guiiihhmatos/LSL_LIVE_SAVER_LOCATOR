package com.lts.backend.models;

import java.util.HashSet;
import java.util.Set;

import com.lts.backend.enums.EstadoChamado;
import com.lts.backend.enums.TipoEmergencia;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "tb_chamado")
public class Chamado {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "cd_chamado")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "cd_ambulancia")
	private Ambulancia ambulancia;
	
	@Column(name = "ds_ocorrencia")
	private String ocorrencia;
	
	@Column(name = "ds_estado_chamado")
	private EstadoChamado estadoChamado;
	
	@OneToOne
	@JoinColumn(name = "cd_local_chamado")
	private LocalChamado localChamado;
	
	@Column(name = "ds_tipo_emergencia")
	private TipoEmergencia tipoEmergencia;
	
	@OneToMany(mappedBy = "chamado")
    private Set<Ambulancia> ambulancias = new HashSet<>();
}
