package com.lts.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lts.backend.models.LocalChamado;
import com.lts.backend.services.LocalChamadoService;

@RestController
@RequestMapping("/localChamado")
public class LocalChamadoController {
	
	@Autowired
	private LocalChamadoService localChamadoService;
	
	@GetMapping
	public List<LocalChamado> buscarTodos() {
		return localChamadoService.findAll();
	}
}
