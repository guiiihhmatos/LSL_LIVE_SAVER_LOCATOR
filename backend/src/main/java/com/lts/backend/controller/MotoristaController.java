package com.lts.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.its.backend.config.TokenService;
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
	
	//@Autowired
	private AuthenticationManager authenticationManager;
	
	//@Autowired
	private TokenService tokenService;
	
	@GetMapping
	public List<Motorista> buscarTodos() {
		return motoristaService.findAll();
	}
	
	@PostMapping("/login")
	public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data)
	{
		UsernamePasswordAuthenticationToken usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
	    Authentication auth = this.authenticationManager.authenticate(usernamePassword);
		
	    String token = tokenService.genToken((Motorista) auth.getPrincipal());
	    
		return ResponseEntity.ok(null);
	}
	
	@SuppressWarnings("rawtypes")
	@PostMapping
	public ResponseEntity salvarMotorista(@RequestBody MotoristaDTO motoristaDTO) {
		try {

	    	return motoristaService.loginExists(motoristaDTO)
	                .map(u -> ResponseEntity.status(HttpStatus.CONFLICT).build())
	                .orElseGet(() -> {
	                	
	                	String encryptedPassword = new BCryptPasswordEncoder().encode(motoristaDTO.getPassword());
	                	motoristaDTO.setPassword(encryptedPassword);
	                	motoristaService.salvarUsuario(motoristaDTO);
	    	            return ResponseEntity.status(HttpStatus.CREATED).build();
	    	        });
	    	
	        
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	    }
	}

	public TokenService getTokenService() {
		return tokenService;
	}

	public void setTokenService(TokenService tokenService) {
		this.tokenService = tokenService;
	}

	public AuthenticationManager getAuthenticationManager() {
		return authenticationManager;
	}

	public void setAuthenticationManager(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}
}
