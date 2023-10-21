package com.lts.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lts.backend.models.HistoricoMotoristaAmbulancia;
import com.lts.backend.repository.IHistoricoMotoristaRepository;

@Service
public class HistoricoMotoristaService {
	
	@Autowired
	private IHistoricoMotoristaRepository historicoMotoristaRepository;
	
	public List<HistoricoMotoristaAmbulancia> listarHistoricoMotorista() {
        return historicoMotoristaRepository.findAll();
    }
	
	@Transactional
	public HistoricoMotoristaAmbulancia salvarHistorico(HistoricoMotoristaAmbulancia data) throws Exception {
		
		historicoMotoristaRepository.save(data);
		
		return data;
	}
}
