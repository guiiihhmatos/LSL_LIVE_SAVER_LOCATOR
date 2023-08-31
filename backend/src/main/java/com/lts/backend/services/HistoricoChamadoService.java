package com.lts.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lts.backend.models.HistoricoChamado;
import com.lts.backend.repository.IHistoricoChamadoRepository;

@Service
public class HistoricoChamadoService {
	
	@Autowired
	private IHistoricoChamadoRepository historicoRepository;
	
	public List<HistoricoChamado> findAll() {
		return historicoRepository.findAll();
	}

}
