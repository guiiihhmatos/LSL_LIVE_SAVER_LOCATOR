package com.lts.backend.models;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.lts.backend.enums.EstadoChamado;
import com.lts.backend.enums.TipoEmergencia;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "tb_chamado")
public class Chamado {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "cd_chamado")
	private Long id;
	
	@ManyToMany
    @JoinTable(
        name = "tb_chamado_ambulancia",
        joinColumns = @JoinColumn(name = "cd_chamado"),
        inverseJoinColumns = @JoinColumn(name = "cd_ambulancia")
    )
    private Set<Ambulancia> ambulancias = new HashSet<>();
	
	@Column(name = "dt_inicio_chamdo")
	private Date dataInicioChamado;
	
	@Column(name = "dt_fim_chamdo")
	private Date dataFimChamado;
	
	@Column(name = "ds_ocorrencia")
	private String ocorrencia;
	
	@Column(name = "ds_estado_chamado")
	private EstadoChamado estadoChamado;
	
	@OneToOne
	@JoinColumn(name = "cd_local_chamado")
	@JsonIgnoreProperties("Chamado")
	private LocalChamado localChamado;
	
	@Column(name = "ds_tipo_emergencia")
	private TipoEmergencia tipoEmergencia;
}
