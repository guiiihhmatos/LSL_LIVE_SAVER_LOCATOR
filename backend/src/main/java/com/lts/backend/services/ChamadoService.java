package com.lts.backend.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lts.backend.DTO.ChamadoDTO;
import com.lts.backend.DTO.EstadoAmbulanciaDTO;
import com.lts.backend.DTO.EstadoChamadoDTO;
import com.lts.backend.enums.EstadoAmbulancia;
import com.lts.backend.enums.EstadoChamado;
import com.lts.backend.exception.error.NotFoundChamado;
import com.lts.backend.models.Ambulancia;
import com.lts.backend.models.Chamado;
import com.lts.backend.models.LocalChamado;
import com.lts.backend.repository.IChamadoRepository;
import com.lts.backend.repository.pagination.IChamadoRepositoryPagination;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

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

        if(chamadoDTO.getEstadoChamado() == EstadoChamado.FINALIZADO)
        {
            for (Long ambulanciaId : chamadoDTO.getAmbulanciaIds()) {
                Ambulancia ambulancia = ambulanciaService.buscarPorId(ambulanciaId).orElse(null);
                EstadoAmbulanciaDTO estadoAmbulanciaDTO = new EstadoAmbulanciaDTO(); 
                estadoAmbulanciaDTO.setId(ambulanciaId);
                estadoAmbulanciaDTO.setEstadoAmbulancia(EstadoAmbulancia.DISPONIVEL);
                ambulanciaService.alterarEstado(estadoAmbulanciaDTO);

                chamado.getAmbulancias().add(ambulancia);
            }
        }
        else
        {
            for (Long ambulanciaId : chamadoDTO.getAmbulanciaIds()) {
                Ambulancia ambulancia = ambulanciaService.buscarPorId(ambulanciaId).orElse(null);
                EstadoAmbulanciaDTO estadoAmbulanciaDTO = new EstadoAmbulanciaDTO(); 
                estadoAmbulanciaDTO.setId(ambulanciaId);
                estadoAmbulanciaDTO.setEstadoAmbulancia(EstadoAmbulancia.OCUPADO);
                ambulanciaService.alterarEstado(estadoAmbulanciaDTO);

                chamado.getAmbulancias().add(ambulancia);
            }
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
        
        if (estadoChamadoDTO.getEstadoChamado() == EstadoChamado.FINALIZADO) {
            chamado.setDataFimChamado(new Date());

            List<Ambulancia> ambulanciasToUpdate = new ArrayList<>();

            for (Ambulancia ambulancia : chamado.getAmbulancias()) {
                EstadoAmbulanciaDTO estadoAmbulanciaDTO = new EstadoAmbulanciaDTO();
                estadoAmbulanciaDTO.setId(ambulancia.getId());
                estadoAmbulanciaDTO.setEstadoAmbulancia(EstadoAmbulancia.DISPONIVEL);
                ambulanciasToUpdate.add(ambulancia);
            }

            for (Ambulancia ambulancia : ambulanciasToUpdate) {
                EstadoAmbulanciaDTO estadoAmbulanciaDTO = new EstadoAmbulanciaDTO(); // Corrigido aqui
                estadoAmbulanciaDTO.setId(ambulancia.getId());
                estadoAmbulanciaDTO.setEstadoAmbulancia(EstadoAmbulancia.DISPONIVEL);
                ambulanciaService.alterarEstado(estadoAmbulanciaDTO);
                chamado.getAmbulancias().add(ambulancia);
            }
        }

        
        chamadoRepository.save(chamado);
        return chamado;
    }

    public List<Chamado> findCurrentChamadosByMotoristaId(Long motoristaId) {
        return chamadoRepository.findCurrentChamadosByMotoristaId(motoristaId);
    }
}
