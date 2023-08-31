package com.lts.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lts.backend.models.HistoricoChamado;
import com.lts.backend.services.HistoricoChamadoService;

@RestController
@RequestMapping("/historicoChamado")
public class HistoricoChamadoController {
	
	@Autowired
	private HistoricoChamadoService historicoService;
	
	@GetMapping
	public List<HistoricoChamado> buscarTodos() {
		return historicoService.findAll();
	}
}
