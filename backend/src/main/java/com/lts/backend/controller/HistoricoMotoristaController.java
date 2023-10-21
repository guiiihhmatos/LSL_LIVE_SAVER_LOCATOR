package com.lts.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lts.backend.models.HistoricoMotoristaAmbulancia;
import com.lts.backend.services.HistoricoMotoristaService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/historico-motorista")
public class HistoricoMotoristaController {
	
	@Autowired
	private HistoricoMotoristaService historicoMotoristaService;
	
	@GetMapping
	public List<HistoricoMotoristaAmbulancia> listarTodos() {
		return historicoMotoristaService.listarHistoricoMotorista();
	}

}
