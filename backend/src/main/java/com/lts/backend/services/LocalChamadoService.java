package com.lts.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lts.backend.models.LocalChamado;
import com.lts.backend.repository.ILocalChamadoRepository;

@Service
public class LocalChamadoService {
	
	@Autowired
	private ILocalChamadoRepository localChamadoRepository;
	
	public List<LocalChamado> findAll() {
		return localChamadoRepository.findAll();
	}
}
