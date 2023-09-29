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

import com.lts.backend.DTO.ChamadoDTO;
import com.lts.backend.DTO.EstadoChamadoDTO;
import com.lts.backend.models.Chamado;
import com.lts.backend.services.ChamadoService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/chamado")
public class ChamadoController {
	
	@Autowired
	private ChamadoService chamadoService;
	
	@GetMapping
	public List<Chamado> listarTodos() {
		return chamadoService.findAll();
	}
	
	@PostMapping
	public ResponseEntity<Chamado> salvarUsuario(@RequestBody ChamadoDTO chamadoDTO) throws Exception {
		Chamado chamado = chamadoService.salvarChamado(chamadoDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(chamado);

	}
	
	@PutMapping
	public ResponseEntity<Chamado> editarUsuario(@RequestBody ChamadoDTO chamadoDTO) throws Exception {
		Chamado chamado = chamadoService.editarChamado(chamadoDTO);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(chamado);
	}
	
	@PutMapping("/alterar-estado")
	public ResponseEntity<Chamado> alterarEstado(@RequestBody EstadoChamadoDTO estadoChamadoDTO) throws Exception {
		Chamado chamado = chamadoService.alterarEstado(estadoChamadoDTO);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(chamado);
	}
}
