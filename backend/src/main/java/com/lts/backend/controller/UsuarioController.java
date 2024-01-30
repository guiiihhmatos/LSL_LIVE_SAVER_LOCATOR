package com.lts.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lts.backend.DTO.AuthenticationDTO;
import com.lts.backend.DTO.LoginResponseUsuarioDTO;
import com.lts.backend.DTO.UsuarioDTO;
import com.lts.backend.DTO.UsuarioHospitalFilter;
import com.lts.backend.models.Usuario;
import com.lts.backend.models.UsuarioHospital;
import com.lts.backend.services.UsuarioService;

import jakarta.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping("/usuario")
public class UsuarioController {
	
	@Autowired
	private UsuarioService usuarioService;
	
	@GetMapping
	public Page<UsuarioHospital> buscarTodos(@PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
		return usuarioService.findAll(pageable);
	}
	
	@GetMapping("/filter/{value}")
	public Page<UsuarioHospitalFilter> filtrarUsuario(@PathVariable("value") String value, @PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) throws Exception {
		return usuarioService.filtrarUsuario(value, pageable);
	}
	

	@PostMapping("/login")
	public ResponseEntity<LoginResponseUsuarioDTO> login(@RequestBody @Valid AuthenticationDTO data) throws Exception {
		LoginResponseUsuarioDTO responseLogin = usuarioService.login(data);

		if(responseLogin != null){
			return ResponseEntity.ok().body(responseLogin);
		}

		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

	@PostMapping
	public ResponseEntity<Usuario> salvarUsuario(@RequestBody UsuarioDTO usuarioDTO) throws Exception {
		Usuario usuarioSalvo = usuarioService.salvarUsuario(usuarioDTO);
		
		if(usuarioSalvo != null){
			return ResponseEntity.status(HttpStatus.CREATED).body(usuarioSalvo);
		}

		return ResponseEntity.status(HttpStatus.CONFLICT).build();

	}
	
	@PutMapping
	public ResponseEntity<Usuario> editarUsuario(@RequestBody UsuarioDTO usuarioDTO) throws Exception {
		Usuario usuarioEditado = usuarioService.editarUsuario(usuarioDTO);
		
		if(usuarioEditado != null){
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(usuarioEditado);
		}

		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
}
