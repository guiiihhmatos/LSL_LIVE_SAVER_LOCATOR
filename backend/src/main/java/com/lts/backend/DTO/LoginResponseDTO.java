package com.lts.backend.DTO;

import com.lts.backend.models.Motorista;

import lombok.Data;

@Data
public class LoginResponseDTO {
	String token;
	Motorista motorista;
}
