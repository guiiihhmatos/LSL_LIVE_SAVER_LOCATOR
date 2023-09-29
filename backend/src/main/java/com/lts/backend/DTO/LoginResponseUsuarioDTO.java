package com.lts.backend.DTO;

import com.lts.backend.models.UsuarioHospital;

import lombok.Data;

@Data
public class LoginResponseUsuarioDTO {
	
	String token;
	UsuarioHospital usuario;
}
