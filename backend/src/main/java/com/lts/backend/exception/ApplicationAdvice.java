package com.lts.backend.exception;

import java.time.OffsetDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.lts.backend.exception.error.NotFoundAmbulancia;
import com.lts.backend.exception.error.NotFoundChamado;
import com.lts.backend.exception.error.NotFoundUser;
import com.lts.backend.exception.error.UserAlreadyExists;

@ControllerAdvice
public class ApplicationAdvice {

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ExceptionDefault> erroGenerico(Exception e) {
		ExceptionDefault ed = new ExceptionDefault(e.getMessage(), OffsetDateTime.now());
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ed);
	}
	
	@ExceptionHandler(UserAlreadyExists.class)
	public ResponseEntity<ExceptionDefault> usuarioJaExiste() {
		ExceptionDefault ed = new ExceptionDefault("Login ja existe", OffsetDateTime.now());
		return ResponseEntity.status(HttpStatus.CONFLICT).body(ed);
	}
	
	@ExceptionHandler(NotFoundUser.class)
	public ResponseEntity<ExceptionDefault> usuarioNaoEncontrado() {
		ExceptionDefault ed = new ExceptionDefault("Usuário não encontrado", OffsetDateTime.now());
		return ResponseEntity.status(HttpStatus.CONFLICT).body(ed);
	}
	
	@ExceptionHandler(NotFoundChamado.class)
	public ResponseEntity<ExceptionDefault> chamadoNaoEncontrado() {
		ExceptionDefault ed = new ExceptionDefault("Chamado não encontrado", OffsetDateTime.now());
		return ResponseEntity.status(HttpStatus.CONFLICT).body(ed);
	}
	
	@ExceptionHandler(NotFoundAmbulancia.class)
	public ResponseEntity<ExceptionDefault> ambulanciaNaoEncontrada() {
		ExceptionDefault ed = new ExceptionDefault("Ambulancia não encontrada", OffsetDateTime.now());
		return ResponseEntity.status(HttpStatus.CONFLICT).body(ed);
	}

}
