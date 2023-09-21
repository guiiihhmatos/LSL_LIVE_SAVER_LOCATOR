package com.lts.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lts.backend.models.Motorista;
import com.lts.backend.repository.IMotoristaRepository;

@Service
public class MotoristaService {
	
	@Autowired
	private IMotoristaRepository motoristaRepository;
	
	public List<Motorista> findAll() {
		return motoristaRepository.findAll();
	}

	public Object loginExists(Motorista motorista) {
		// TODO Auto-generated method stub
		return null;
	}
}
