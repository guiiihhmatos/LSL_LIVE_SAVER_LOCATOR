package com.lts.backend.controller;

import java.util.List;

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
import com.lts.backend.enums.errors.ErrosGenericos;
import com.lts.backend.models.Motorista;
import com.lts.backend.models.Usuario;
import com.lts.backend.models.objetos.MotoristaEnumErro;
import com.lts.backend.services.MotoristaService;

import jakarta.validation.Valid;

@CrossOrigin("*")
@RestController
@RequestMapping("/motorista")
public class MotoristaController {

	@Autowired
	private MotoristaService motoristaService;
	

	@GetMapping
	public Page<Motorista> findAll(@PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
		return motoristaService.findAll(pageable);
	}

	@GetMapping("/logados")
	public List<Motorista> findAllLogged() {
		return motoristaService.findAllLogged();
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
	public ResponseEntity<Object> logout(@RequestBody Long id) throws Exception{
		MotoristaEnumErro motoristaEnum = motoristaService.logout(id);

		if(motoristaEnum.getErrosGenericos() == null && motoristaEnum.getErroChamado() == null){
			Motorista loggedOutResp = motoristaEnum.getMotorista();
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(loggedOutResp);
		}
		
		if(motoristaEnum.getErrosGenericos() == ErrosGenericos.NAO_ENCONTRADO) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}

		switch (motoristaEnum.getErroChamado()) {
			case SEM_AMBULANCIA:
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não tem ambulancia vinculada ao motorista");
			case CHAMADO_EM_ANDAMENTO:
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Motorista vinculado a um chamado");
			default:
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

	}

}
