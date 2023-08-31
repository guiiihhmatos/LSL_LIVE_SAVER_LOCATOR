package com.lts.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lts.backend.models.LocalizacaoAmbulancia;
import com.lts.backend.services.LocalizacaoAmbulanciaService;

@RestController
@RequestMapping("/localizacaoAmbulancia")
public class LocalizacaoAmbulanciaController {

	@Autowired
	private LocalizacaoAmbulanciaService localizacaoAmbulanciaService;
	
	@GetMapping
	public List<LocalizacaoAmbulancia> buscarTodas() {
		return localizacaoAmbulanciaService.findAll();
	}
}
