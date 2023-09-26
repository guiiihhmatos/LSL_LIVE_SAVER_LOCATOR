package com.lts.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lts.backend.DTO.AuthenticationDTO;
import com.lts.backend.DTO.LoginResponseDTO;
import com.lts.backend.DTO.MotoristaDTO;
import com.lts.backend.models.Motorista;
import com.lts.backend.services.MotoristaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/motorista")
public class MotoristaController {

	@Autowired
	private MotoristaService motoristaService;

	@GetMapping
	public List<Motorista> buscarTodos() {
		return motoristaService.findAll();
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AuthenticationDTO data) throws Exception {
		String token = motoristaService.login(data);
		return ResponseEntity.ok(new LoginResponseDTO(token));
	}

	@PostMapping
	public ResponseEntity<Object> salvarMotorista(@RequestBody MotoristaDTO motoristaDTO) throws Exception {
		motoristaService.salvarUsuario(motoristaDTO);
		return ResponseEntity.status(HttpStatus.CREATED).build();

	}

}
