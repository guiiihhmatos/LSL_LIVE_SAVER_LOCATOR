package com.lts.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lts.backend.models.Chamado;
import com.lts.backend.repository.IChamadoRepository;

@Service
public class ChamadoService {
	
	@Autowired
	private IChamadoRepository chamadoRepository;
	
	public List<Chamado> findAll(){
		return chamadoRepository.findAll();
	}
}
