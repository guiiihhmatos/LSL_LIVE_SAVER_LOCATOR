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
import com.lts.backend.repository.IAmbulanciaRepository;

@Service
public class AmbulanciaService {

    @Autowired
    private IAmbulanciaRepository ambulanciaRepository;

    public List<Ambulancia> buscarTodas() {
		return ambulanciaRepository.findAll();
	}
    
    public Optional<Ambulancia> buscarPorId(Long id)
	{
		return ambulanciaRepository.findById(id);
	}
    
    @Transactional
    public Ambulancia salvarAmbulancia(AmbulanciaDTO ambulanciaDTO) throws Exception {
        Ambulancia ambulancia = new Ambulancia();

        ambulancia.setPlaca(ambulanciaDTO.getPlaca());
        ambulancia.setLatitude(ambulanciaDTO.getLatitude());
        ambulancia.setLongitude(ambulanciaDTO.getLongitude());
        ambulancia.setEstadoAmbulancia(ambulanciaDTO.getEstadoAmbulancia());

        ambulanciaRepository.save(ambulancia);
        return ambulancia;
    }

    @Transactional
    public Ambulancia editarAmbulancia(AmbulanciaDTO ambulanciaDTO) throws Exception {
        Ambulancia ambulancia = ambulanciaRepository.findById(ambulanciaDTO.getId()).orElseThrow(NotFoundAmbulancia::new);

        ambulancia.setPlaca(ambulanciaDTO.getPlaca());
        ambulancia.setLatitude(ambulanciaDTO.getLatitude());
        ambulancia.setLongitude(ambulanciaDTO.getLongitude());
        ambulancia.setEstadoAmbulancia(ambulanciaDTO.getEstadoAmbulancia());

        ambulanciaRepository.save(ambulancia);
        return ambulancia;
    }

    @Transactional
    public Ambulancia alterarEstado(EstadoAmbulanciaDTO estadoAmbulanciaDTO) throws Exception {
        Ambulancia ambulancia = ambulanciaRepository.findById(estadoAmbulanciaDTO.getId()).orElseThrow(NotFoundAmbulancia::new);
        ambulancia.setEstadoAmbulancia(estadoAmbulanciaDTO.getEstadoAmbulancia());
        ambulanciaRepository.save(ambulancia);
        return ambulancia;
    }
}
