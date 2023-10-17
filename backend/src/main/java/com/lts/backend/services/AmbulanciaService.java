package com.lts.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lts.backend.DTO.AmbulanciaDTO;
import com.lts.backend.DTO.EstadoAmbulanciaDTO;
import com.lts.backend.exception.error.NotFoundAmbulancia;
import com.lts.backend.models.Ambulancia;
import com.lts.backend.models.Chamado;
import com.lts.backend.repository.IAmbulanciaRepository;

@Service
public class AmbulanciaService {
	
	@Autowired
	private IAmbulanciaRepository ambulanciaRepository;
	
	public List<Ambulancia> findAll() {
		return ambulanciaRepository.findAll();
	}
	
	public Ambulancia findById(Long id)
	{
		return ambulanciaRepository.findById(id).get();
	}
	
	@Transactional
	public Ambulancia salvarAmbulancia(AmbulanciaDTO ambulanciaDTO) throws Exception {
		
		Ambulancia ambulancia = new Ambulancia();
		ambulancia.setPlaca(ambulanciaDTO.getPlaca());
		ambulancia.setLatitude(ambulanciaDTO.getLatitude());
		ambulancia.setEstadoAmbulancia(ambulanciaDTO.getEstadoAmbulancia());
		ambulancia.setLongitude(ambulanciaDTO.getLongitude());
		
		ambulanciaRepository.save(ambulancia);
		
		return ambulancia;
	}
	
	@Transactional
	public Ambulancia editarAmbulancia(AmbulanciaDTO ambulanciaDTO) throws Exception {

		Optional<Ambulancia> ambulanciaOptional = ambulanciaRepository.findById(ambulanciaDTO.getId());
		
		if(ambulanciaOptional.isEmpty())
		{
			throw new NotFoundAmbulancia();
		}
		
		Ambulancia ambulancia = ambulanciaOptional.get();
		ambulancia.setPlaca(ambulanciaDTO.getPlaca());
		ambulancia.setLatitude(ambulanciaDTO.getLatitude());
		ambulancia.setEstadoAmbulancia(ambulanciaDTO.getEstadoAmbulancia());
		ambulancia.setLongitude(ambulanciaDTO.getLongitude());
		
		ambulanciaRepository.save(ambulancia);
		
		return ambulancia;
	}
	
	@Transactional
	public Ambulancia alterarEstado(EstadoAmbulanciaDTO estadoAmbulanciaDTO) throws Exception {
		
		Optional<Ambulancia> ambulanciaOptional = ambulanciaRepository.findById(estadoAmbulanciaDTO.getId());
		
		if(ambulanciaOptional.isEmpty())
		{
			throw new NotFoundAmbulancia();
		}
		
		Ambulancia ambulancia = ambulanciaOptional.get();
		ambulancia.setEstadoAmbulancia(estadoAmbulanciaDTO.getEstadoAmbulancia());
		
		ambulanciaRepository.save(ambulancia);
		
		return ambulancia;
	}

}
