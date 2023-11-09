package com.lts.backend.models;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "tb_historico_chamado")
public class HistoricoChamado {
	
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;

	 @Column(name = "dt_chamado")
	 private Date data;
	 
	 @Column(name = "dt_duracao")
	 private Date duracao;

	 @ManyToOne
	 private Chamado Chamado;
}
