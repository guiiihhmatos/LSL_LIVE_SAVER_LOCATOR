package com.lts.backend.exception;

import java.time.OffsetDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ApplicationAdvice {

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ExceptionDefault> erroGenerico(Exception e) {
		ExceptionDefault ed = new ExceptionDefault(e.getMessage(), OffsetDateTime.now());
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ed);
	}

}
