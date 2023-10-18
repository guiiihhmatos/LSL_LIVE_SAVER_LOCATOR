package com.lts.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lts.backend.DTO.AmbulanciaDTO;
import com.lts.backend.DTO.EstadoAmbulanciaDTO;
import com.lts.backend.models.Ambulancia;
import com.lts.backend.services.AmbulanciaService;

@CrossOrigin
@RestController
@RequestMapping("/ambulancia")
public class AmbulanciaController {
	
	@Autowired
	private AmbulanciaService ambulanciaService;
	
	@GetMapping
	public List<Ambulancia> buscarTodas() {
		return ambulanciaService.findAll();
	}
	
	@PostMapping
	public ResponseEntity<Ambulancia> salvarAmbulancia(@RequestBody AmbulanciaDTO ambulanciaDTO) throws Exception {
		Ambulancia ambulancia = ambulanciaService.salvarAmbulancia(ambulanciaDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(ambulancia);

	}
	
	@PutMapping
	public ResponseEntity<Ambulancia> editarAmbulancia(@RequestBody AmbulanciaDTO ambulanciaDTO) throws Exception {
		Ambulancia ambulancia = ambulanciaService.editarAmbulancia(ambulanciaDTO);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(ambulancia);
	}
	
	@PutMapping("/alterar-estado")
	public ResponseEntity<Ambulancia> alterarAmbulancia(@RequestBody EstadoAmbulanciaDTO estadoAmbulanciaDTO) throws Exception {
		Ambulancia ambulancia = ambulanciaService.alterarEstado(estadoAmbulanciaDTO);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(ambulancia);
	}

}
