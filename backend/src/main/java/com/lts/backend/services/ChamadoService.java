package com.lts.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lts.backend.DTO.ChamadoDTO;
import com.lts.backend.DTO.EstadoChamadoDTO;
import com.lts.backend.exception.error.NotFoundChamado;
import com.lts.backend.models.Ambulancia;
import com.lts.backend.models.Chamado;
import com.lts.backend.models.LocalChamado;
import com.lts.backend.repository.IChamadoRepository;
import com.lts.backend.repository.IHistoricoChamadoRepository;

@Service
public class ChamadoService {
	
	@Autowired
	private IChamadoRepository chamadoRepository;
	
	@Autowired
	private IHistoricoChamadoRepository historicoRepository;
	
	@Autowired
	private AmbulanciaService ambulanciaService;
	
	public List<Chamado> findAll(){
		return chamadoRepository.findAll();
	}
	
	@Transactional
	public Chamado salvarChamado(ChamadoDTO chamadoDTO) throws Exception {
		
		Chamado chamado = new Chamado();
		Ambulancia ambulancia = new Ambulancia();
		LocalChamado localChamado = new LocalChamado();
		
		if(chamadoDTO.getAmbulanciaId() != null)
		{
			ambulancia = ambulanciaService.findById(chamadoDTO.getAmbulanciaId());
		}
		
		chamado.setAmbulancia(ambulancia);
		chamado.setTipoEmergencia(chamadoDTO.getTipoEmergencia());
		chamado.setEstadoChamado(chamadoDTO.getEstadoChamado());
		chamado.setOcorrencia(chamadoDTO.getOcorrencia());
		
		localChamado.setRua(chamadoDTO.getLocalChamado().getRua());
		localChamado.setBairro(chamadoDTO.getLocalChamado().getBairro());
		localChamado.setCep(chamadoDTO.getLocalChamado().getCep());
		localChamado.setCidade(chamadoDTO.getLocalChamado().getCidade());
		localChamado.setEstado(chamadoDTO.getLocalChamado().getEstado());
		localChamado.setNumero(chamadoDTO.getLocalChamado().getNumero());
		
		chamado.setLocalChamado(localChamado);
		
		chamadoRepository.save(chamado);
		
		return chamado;
	}
	
	@Transactional
	public Chamado editarChamado(ChamadoDTO chamadoDTO) throws Exception {
		
		Chamado chamado = new Chamado();
		Ambulancia ambulancia = new Ambulancia();
		LocalChamado localChamado = new LocalChamado();
		
		if(chamadoDTO.getAmbulanciaId() != null)
		{
			ambulancia = ambulanciaService.findById(chamadoDTO.getAmbulanciaId());
			chamado.setAmbulancia(ambulancia);
		}
		else {
			chamado.setAmbulancia(null);
		}
		
		chamado.setId(chamadoDTO.getId());
		
		chamado.setTipoEmergencia(chamadoDTO.getTipoEmergencia());
		chamado.setEstadoChamado(chamadoDTO.getEstadoChamado());
		chamado.setOcorrencia(chamadoDTO.getOcorrencia());
		
		localChamado.setRua(chamadoDTO.getLocalChamado().getRua());
		localChamado.setBairro(chamadoDTO.getLocalChamado().getBairro());
		localChamado.setCep(chamadoDTO.getLocalChamado().getCep());
		localChamado.setCidade(chamadoDTO.getLocalChamado().getCidade());
		localChamado.setEstado(chamadoDTO.getLocalChamado().getEstado());
		localChamado.setNumero(chamadoDTO.getLocalChamado().getNumero());
		
		chamado.setLocalChamado(localChamado);
		
		chamadoRepository.save(chamado);
		
		return chamado;
	}
	
	@Transactional
	public Chamado alterarEstado(EstadoChamadoDTO estadoChamadoDTO) throws Exception {
		
		Optional<Chamado> chamadoOptional = chamadoRepository.findById(estadoChamadoDTO.getId());
		
		if(chamadoOptional.isEmpty())
		{
			throw new NotFoundChamado();
		}
		
		Chamado chamado = new Chamado();
		chamado.setId(estadoChamadoDTO.getId());
		chamado.setEstadoChamado(estadoChamadoDTO.getEstadoChamado());
		
		chamadoRepository.save(chamado);
		
		return chamado;
	}
	
}
