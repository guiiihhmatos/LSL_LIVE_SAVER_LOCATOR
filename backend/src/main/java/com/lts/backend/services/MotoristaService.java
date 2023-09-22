package com.lts.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lts.backend.DTO.MotoristaDTO;
import com.lts.backend.models.Motorista;
import com.lts.backend.models.Usuario;
import com.lts.backend.repository.IMotoristaRepository;

@Service
public class MotoristaService {
	
	@Autowired
	private IMotoristaRepository motoristaRepository;
	
	public List<Motorista> findAll() {
		return motoristaRepository.findAll();
	}

	@Transactional
	public Optional<Motorista> loginExists(MotoristaDTO motoristaDTO)
	{
		return motoristaRepository.findByLogin(motoristaDTO.getLogin());
	}
	
	@Transactional
	public Usuario salvarUsuario(MotoristaDTO motoristaDTO)
	{
		Motorista motorista = new Motorista();
		motorista.setNome(motoristaDTO.getNome());
		motorista.setCpf(motoristaDTO.getCpf());
		motorista.setLogin(motoristaDTO.getLogin());
		motorista.setPassword(motoristaDTO.getPassword());
        
		motoristaRepository.save(motorista);
        
        return motorista;
	}
	
}
