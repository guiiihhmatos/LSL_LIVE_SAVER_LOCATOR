package com.lts.backend.DTO;

import com.lts.backend.models.Motorista;

import lombok.Data;

@Data
public class LoginResponseMotoristaDTO {
	String token;
	Motorista motorista;
	Long idAmbulancia;
}
