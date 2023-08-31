package com.lts.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lts.backend.models.Chamado;
import com.lts.backend.services.ChamadoService;

@RestController
@RequestMapping(value = "/chamado")
public class ChamadoController {
	
	@Autowired
	private ChamadoService chamadoService;
	
	@GetMapping
	public List<Chamado> listarTodos() {
		return chamadoService.findAll();
	}
}
