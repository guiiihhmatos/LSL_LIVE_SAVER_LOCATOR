package com.lts.backend.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lts.backend.DTO.ChamadoDTO;
import com.lts.backend.DTO.EstadoAmbulanciaDTO;
import com.lts.backend.DTO.EstadoChamadoDTO;
import com.lts.backend.DTO.TempoMedioChamadoDTO;
import com.lts.backend.enums.EstadoAmbulancia;
import com.lts.backend.enums.EstadoChamado;
import com.lts.backend.exception.error.NotFoundChamado;
import com.lts.backend.models.Ambulancia;
import com.lts.backend.models.Chamado;
import com.lts.backend.models.LocalChamado;
import com.lts.backend.repository.IChamadoRepository;
import com.lts.backend.repository.pagination.IChamadoRepositoryPagination;

@Service
public class ChamadoService {

    @Autowired
    private IChamadoRepository chamadoRepository;
    
    @Autowired
    private IChamadoRepositoryPagination chamadoRepositoryPagination;

    @Autowired
    private AmbulanciaService ambulanciaService;

    @Autowired
    private LocalChamadoService localChamadoService;
    
    /*public List<Chamado> listarChamadosComAmbulancias() {
        return chamadoRepository.findAllWithAmbulancias();
    }*/
    
    public Page<Chamado> listarChamadosComAmbulancias(Pageable pageable) {
    	return chamadoRepositoryPagination.findAll(pageable);
    }

    public Long totalChamadosAcaminho() {
		return chamadoRepository.totalChamadosAcaminho();
	}

    public Long totalChamadosRetornando() {
		return chamadoRepository.totalChamadosRetornando();
	}

    public Long totalChamadosFinalizado() {
		return chamadoRepository.totalChamadosFinalizado();
	}

    @Transactional
    public Chamado salvarChamado(ChamadoDTO chamadoDTO) throws Exception {
        Chamado chamado = new Chamado();

        if (chamadoDTO.getAmbulanciaIds() != null) {
            for (Long ambulanciaId : chamadoDTO.getAmbulanciaIds()) {
                Ambulancia ambulancia = ambulanciaService.buscarPorId(ambulanciaId).orElse(null);
                EstadoAmbulanciaDTO estadoAmbulanciaDTO = new EstadoAmbulanciaDTO(); 
                estadoAmbulanciaDTO.setId(ambulanciaId);
                estadoAmbulanciaDTO.setEstadoAmbulancia(EstadoAmbulancia.OCUPADO);
                ambulanciaService.alterarEstado(estadoAmbulanciaDTO);

                chamado.getAmbulancias().add(ambulancia);
            }
        }
        
        chamado.setDataInicioChamado(new Date());
        chamado.setTipoEmergencia(chamadoDTO.getTipoEmergencia());
        chamado.setEstadoChamado(chamadoDTO.getEstadoChamado());
        chamado.setOcorrencia(chamadoDTO.getOcorrencia());

        LocalChamado localChamado = new LocalChamado();
        localChamado.setEndereco(chamadoDTO.getLocalChamado().getEndereco());
        localChamado.setBairro(chamadoDTO.getLocalChamado().getBairro());
        localChamado.setCep(chamadoDTO.getLocalChamado().getCep());
        localChamado.setCidade(chamadoDTO.getLocalChamado().getCidade());
        localChamado.setEstado(chamadoDTO.getLocalChamado().getEstado());
        localChamado.setNumero(chamadoDTO.getLocalChamado().getNumero());
        localChamado.setLatitude(chamadoDTO.getLocalChamado().getLatitude());
        localChamado.setLongitude(chamadoDTO.getLocalChamado().getLongitude());

        localChamadoService.salvarLocal(localChamado);
        chamado.setLocalChamado(localChamado);

        chamadoRepository.save(chamado);
        return chamado;
    }

    @Transactional
    public Chamado editarChamado(ChamadoDTO chamadoDTO) throws Exception {
        Chamado chamado = chamadoRepository.findById(chamadoDTO.getId()).orElseThrow(NotFoundChamado::new);

        chamado.getAmbulancias().clear();

        if (chamadoDTO.getAmbulanciaIds() != null) {
            for (Long ambulanciaId : chamadoDTO.getAmbulanciaIds()) {
                Ambulancia ambulancia = ambulanciaService.buscarPorId(ambulanciaId).orElse(null);
                chamado.getAmbulancias().add(ambulancia);
            }
        }
        
        for (Long ambulanciaId : chamadoDTO.getAmbulanciaIds()) {
            Ambulancia ambulancia = ambulanciaService.buscarPorId(ambulanciaId).orElse(null);
//            EstadoAmbulanciaDTO estadoAmbulanciaDTO = new EstadoAmbulanciaDTO(); 
//            estadoAmbulanciaDTO.setId(ambulanciaId);
//            if(chamadoDTO.getEstadoChamado() == EstadoChamado.FINALIZADO) {
//            	estadoAmbulanciaDTO.setEstadoAmbulancia(EstadoAmbulancia.DISPONIVEL);
//            }  else {
//            	estadoAmbulanciaDTO.setEstadoAmbulancia(EstadoAmbulancia.OCUPADO);
//            }
//            ambulanciaService.alterarEstado(estadoAmbulanciaDTO);
            chamado.getAmbulancias().add(ambulancia);
        }
        

        chamado.setTipoEmergencia(chamadoDTO.getTipoEmergencia());
        chamado.setEstadoChamado(chamadoDTO.getEstadoChamado());
        chamado.setOcorrencia(chamadoDTO.getOcorrencia());

        LocalChamado localChamado = chamado.getLocalChamado();
        localChamado.setEndereco(chamadoDTO.getLocalChamado().getEndereco());
        localChamado.setBairro(chamadoDTO.getLocalChamado().getBairro());
        localChamado.setCep(chamadoDTO.getLocalChamado().getCep());
        localChamado.setCidade(chamadoDTO.getLocalChamado().getCidade());
        localChamado.setEstado(chamadoDTO.getLocalChamado().getEstado());
        localChamado.setNumero(chamadoDTO.getLocalChamado().getNumero());
        localChamado.setLatitude(chamadoDTO.getLocalChamado().getLatitude());
        localChamado.setLongitude(chamadoDTO.getLocalChamado().getLongitude());

        localChamadoService.salvarLocal(localChamado);

        chamadoRepository.save(chamado);
        return chamado;
    }

    @Transactional
    public Chamado alterarEstado(EstadoChamadoDTO estadoChamadoDTO) throws Exception {
        Chamado chamado = chamadoRepository.findById(estadoChamadoDTO.getId()).orElseThrow(NotFoundChamado::new);
        chamado.setEstadoChamado(estadoChamadoDTO.getEstadoChamado());
        
        if(estadoChamadoDTO.getEstadoChamado() == EstadoChamado.FINALIZADO) {
        	chamado.setDataFimChamado(new Date());
        }
        chamado.getAmbulancias().forEach(amb -> {
        	if(estadoChamadoDTO.getEstadoChamado() == EstadoChamado.FINALIZADO) {
        		amb.setEstadoAmbulancia(EstadoAmbulancia.DISPONIVEL);
        	} else {
        		amb.setEstadoAmbulancia(EstadoAmbulancia.OCUPADO);
        	}
        });
        
        
        chamadoRepository.save(chamado);
        return chamado;
    }

    public List<Chamado> findCurrentChamadosByMotoristaId(Long motoristaId) {
        return chamadoRepository.findCurrentChamadosByMotoristaId(motoristaId);
    }
    
    public Page<Chamado> filtrarChamados(String value, Pageable pageable) {
    	return chamadoRepositoryPagination.filterAll(value, pageable);
    }


    public TempoMedioChamadoDTO calcularTempoMedio() {
        List<Chamado> chamados = chamadoRepository.findAll();

        TempoMedioChamadoDTO tempoMedio = new TempoMedioChamadoDTO();

        double somaDiferencas = 0;
        int contadorChamado = 0;

        for (Chamado chamado : chamados) {

            Date dataInicio = chamado.getDataInicioChamado();
            Date dataFim = chamado.getDataFimChamado();
    
            if (dataFim != null) {
                long diferencaEmMillis = dataFim.getTime() - dataInicio.getTime();
                somaDiferencas += diferencaEmMillis;
                contadorChamado++;
            }
            
        }

        double mediaDiferencas = (double) somaDiferencas / contadorChamado;
        // long minutos = (mediaDiferencas / (1000 * 60)) % 60;
        // long horas = (mediaDiferencas / (1000 * 60 * 60)) % 24;
        // long dias = mediaDiferencas / (1000 * 60 * 60 * 24);

        tempoMedio.setTempoMedioMili(mediaDiferencas);
        tempoMedio.setQtdeChamados(contadorChamado);

        return tempoMedio;
    }
}
