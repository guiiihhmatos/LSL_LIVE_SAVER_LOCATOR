package com.lts.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lts.backend.DTO.AuthenticationMotoristaDTO;
import com.lts.backend.DTO.LoginResponseMotoristaDTO;
import com.lts.backend.DTO.MotoristaDTO;
import com.lts.backend.DTO.MotoristaFilter;
import com.lts.backend.models.Motorista;
import com.lts.backend.models.Usuario;
import com.lts.backend.services.MotoristaService;

import jakarta.validation.Valid;

@CrossOrigin("*")
@RestController
@RequestMapping("/motorista")
public class MotoristaController {

	@Autowired
	private MotoristaService motoristaService;
	

	@GetMapping
	public Page<Motorista> buscarTodos(@PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
		return motoristaService.findAll(pageable);
	}
	
	@GetMapping("filter/{value}")
	public Page<MotoristaFilter> filtrarMotoristas(@PathVariable String value, Pageable pageable) {
		return motoristaService.filtrarMotoristas(value, pageable);
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponseMotoristaDTO> login(@RequestBody @Valid AuthenticationMotoristaDTO data) throws Exception {
		LoginResponseMotoristaDTO responseLogin = motoristaService.login(data);
		return ResponseEntity.ok().body(responseLogin);
	}

	@PostMapping
	public ResponseEntity<Usuario> salvarMotorista(@RequestBody MotoristaDTO motoristaDTO) throws Exception {
		Usuario motoristaSalvo = motoristaService.salvarMotorista(motoristaDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(motoristaSalvo);

	}
	
	@PutMapping
	public ResponseEntity<Usuario> editarMotorista(@RequestBody MotoristaDTO motoristaDTO) throws Exception {
		Usuario motoristaEditado = motoristaService.editarMotorista(motoristaDTO);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(motoristaEditado);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<MotoristaDTO> deleteUsuario(@PathVariable Long id) throws Exception{
		MotoristaDTO motoristaRemovido = motoristaService.removerMotorista(id);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(motoristaRemovido);
	}
	
	@PostMapping("/logout")
	public ResponseEntity<Motorista> logout(@RequestBody Long id) throws Exception{
		Motorista loggedOut = motoristaService.logout(id);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(loggedOut);
	}

}
