package com.lts.backend.models;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "tb_historico_motorista_ambulancia")
public class HistoricoMotoristaAmbulancia {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "cd_historico")
	private Long id;
	
	@Column(name = "cd_ambulancia")
	private Long idAmbulancia;
	
	@Column(name = "cd_motorista")
	private Long idMotorista;
	
	@Column(name = "dt_historico")
	private Date data;

}
