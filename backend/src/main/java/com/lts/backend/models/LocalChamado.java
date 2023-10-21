package com.lts.backend.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "tb_local_chamado")
public class LocalChamado {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "cd_local_chamado")
	private Long id;
	
	@Column(name = "nm_endereco")
	private String endereco;
	
	@Column(name = "nm_bairro")
	private String bairro;
	
	@Column(name = "nr_rua")
	private Integer numero;
	
	@Column(name = "nm_cidade")
	private String cidade;
	
	@Column(name = "nm_estado")
	private String estado;
	
	@Column(name = "nr_cep")
	private String cep;
}
