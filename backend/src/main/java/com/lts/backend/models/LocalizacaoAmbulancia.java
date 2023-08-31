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
@Table(name = "tb_localizacao")
public class LocalizacaoAmbulancia {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(name = "ds_latitude")
	private String latitude;
	
	@Column(name = "ds_longitude")
	private String longitude;
	
	@OneToOne(mappedBy = "localizacaoAmbulancia", cascade = CascadeType.ALL)
    private Ambulancia ambulancia;
}
