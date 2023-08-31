package com.lts.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lts.backend.models.Ambulancia;
import com.lts.backend.services.AmbulanciaService;

@RestController
@RequestMapping("/ambulancia")
public class AmbulanciaController {
	
	@Autowired
	private AmbulanciaService ambulanciaService;
	
	
	@GetMapping
	public List<Ambulancia> buscarTodas() {
		return ambulanciaService.findAll();
	}

}
