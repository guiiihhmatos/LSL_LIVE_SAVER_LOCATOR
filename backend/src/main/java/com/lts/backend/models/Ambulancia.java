package com.lts.backend.models;

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
	private Long cd_ambulancia;
	
	
}
