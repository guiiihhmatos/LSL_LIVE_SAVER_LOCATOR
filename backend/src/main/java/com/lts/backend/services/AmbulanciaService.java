package com.lts.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lts.backend.models.Ambulancia;
import com.lts.backend.repository.IAmbulanciaRepository;

@Service
public class AmbulanciaService {
	
	@Autowired
	private IAmbulanciaRepository ambulanciaRepository;
	
	public List<Ambulancia> findAll() {
		return ambulanciaRepository.findAll();
	}

}
