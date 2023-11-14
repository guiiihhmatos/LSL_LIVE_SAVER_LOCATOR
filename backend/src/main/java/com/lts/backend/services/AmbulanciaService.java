package com.lts.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lts.backend.DTO.AmbulanciaDTO;
import com.lts.backend.DTO.EstadoAmbulanciaDTO;
import com.lts.backend.DTO.MotoristaAmbulanciaDTO;
import com.lts.backend.DTO.MotoristaDTO;
import com.lts.backend.exception.error.NotFoundAmbulancia;
import com.lts.backend.models.Ambulancia;
import com.lts.backend.models.Motorista;
import com.lts.backend.repository.IAmbulanciaRepository;
import com.lts.backend.repository.pagination.IAmbulanciaRepositoryPagination;

@Service
public class AmbulanciaService {

    @Autowired
    private IAmbulanciaRepository ambulanciaRepository;
    
    @Autowired
    private IAmbulanciaRepositoryPagination ambulanciaRepositoryPagination;

    public Page<Ambulancia> buscarTodas(Pageable pageable) {
		return ambulanciaRepositoryPagination.findAll(pageable);
	}
    
    public Optional<Ambulancia> buscarPorMotorista(Motorista motorista) {
    	return ambulanciaRepository.findByMotorista(motorista);
    }
    
    public Optional<Ambulancia> buscarPorId(Long id)
	{
		return ambulanciaRepository.findById(id);
	}
    
    public List<Ambulancia> buscarTodasDispMotorista() {
		return ambulanciaRepository.findAllAmbulanciasDispMotorista();
	}
    
    public List<Ambulancia> buscarTodasDisp() {
		return ambulanciaRepository.findAllAmbulanciasDisp();
	}

    public Long totalAmbulanciasOcupadas() {
		return ambulanciaRepository.totalAmbulanciasOcupadas();
	}

    public Long totalAmbulanciasDisponiveis() {
		return ambulanciaRepository.totalAmbulanciasDisponiveis();
	}

    public Long totalAmbulanciasInativas() {
		return ambulanciaRepository.totalAmbulanciasInativas();
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
    
    @Transactional
    public Ambulancia alterarMotorista(MotoristaAmbulanciaDTO data) throws Exception {
        Ambulancia ambulancia = ambulanciaRepository.findById(data.idAmbulancia()).orElseThrow(NotFoundAmbulancia::new);
        
        ambulancia.setMotorista(data.motorista());
        ambulanciaRepository.save(ambulancia);
        return ambulancia;
    }
}
