package com.lts.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lts.backend.models.Colaborador;
import com.lts.backend.repository.IUsuarioRepository;

@Service
public class UsuarioService {
	
	@Autowired
	private IUsuarioRepository usuarioRepository;
	
	public List<Colaborador> findAll() {
		return usuarioRepository.findAll();
	}
}
