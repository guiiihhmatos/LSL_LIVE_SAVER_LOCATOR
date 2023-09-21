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

import com.lts.backend.models.Motorista;
import com.lts.backend.services.MotoristaService;

@RestController
@RequestMapping("/motorista")
public class MotoristaController {
	
	@Autowired
	private MotoristaService motoristaService;
	
	@GetMapping
	public List<Motorista> buscarTodos() {
		return motoristaService.findAll();
	}
	
	@SuppressWarnings("rawtypes")
	@PostMapping
	public ResponseEntity salvarMotorista(@RequestBody Motorista motorista) {
		try {

	    	return motoristaService.loginExists(motorista)
	                .map(u -> ResponseEntity.status(HttpStatus.CONFLICT).build())
	                .orElseGet(() -> {
	                	
	                	String encryptedPassword = new BCryptPasswordEncoder().encode(requestDTO.getPassword());
	                	requestDTO.setPassword(encryptedPassword);
	    	            usuarioService.salvarUsuario(requestDTO);
	    	            return ResponseEntity.status(HttpStatus.CREATED).build();
	    	        });
	    	
	        
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	    }
	}
}
