package com.lts.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lts.backend.DTO.AuthenticationDTO;
import com.lts.backend.DTO.MotoristaDTO;
import com.lts.backend.config.TokenService;
import com.lts.backend.exception.error.NotFoundUser;
import com.lts.backend.exception.error.UserAlreadyExists;
import com.lts.backend.models.Motorista;
import com.lts.backend.models.Usuario;
import com.lts.backend.repository.IMotoristaRepository;

@Service
public class MotoristaService {

	@Autowired
	private IMotoristaRepository motoristaRepository;

	@Autowired
	private TokenService tokenService;

	public List<Motorista> findAll() {
		return motoristaRepository.findAll();
	}

	@Transactional
	public Optional<Motorista> loginExists(MotoristaDTO motoristaDTO) {
		return motoristaRepository.findByLogin(motoristaDTO.getLogin());
	}

	public String login(AuthenticationDTO data) throws Exception {
		Motorista motorista = motoristaRepository.findByLogin(data.login()).orElseThrow();
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		if (!passwordEncoder.matches(data.password(), motorista.getPassword())) {
			throw new Exception("Senha não confere");
		}
		String token = tokenService.genToken(motorista);
		return token;
	}

	@Transactional
	public Usuario salvarUsuario(MotoristaDTO motoristaDTO) throws Exception {
		Optional<Motorista> motoristaOpt = motoristaRepository.findByLogin(motoristaDTO.getLogin());
		if (motoristaOpt.isPresent()) {
			throw new UserAlreadyExists();
		}
		String encryptedPassword = new BCryptPasswordEncoder().encode(motoristaDTO.getPassword());
		Motorista motorista = new Motorista();
		motorista.setNome(motoristaDTO.getNome());
		motorista.setCpf(motoristaDTO.getCpf());
		motorista.setLogin(motoristaDTO.getLogin());
		motorista.setPassword(encryptedPassword);
		motoristaRepository.save(motorista);
		return motorista;
	}
	
	@Transactional
	public Usuario editarUsuario(MotoristaDTO motoristaDTO) throws Exception {
		Optional<Motorista> motoristaOpt = motoristaRepository.findById(motoristaDTO.getId());
		if (motoristaOpt.isEmpty()) {
			throw new NotFoundUser();
		}
		
		String encryptedPassword = new BCryptPasswordEncoder().encode(motoristaDTO.getPassword());
		Motorista motorista = new Motorista();
		motorista.setId(motoristaDTO.getId());
		motorista.setNome(motoristaDTO.getNome());
		motorista.setCpf(motoristaDTO.getCpf());
		motorista.setLogin(motoristaDTO.getLogin());
		motorista.setPassword(encryptedPassword);
		motoristaRepository.save(motorista);
		return motorista;
	}
	
	@Transactional
	public MotoristaDTO removerUsuario(Long idMotorista) throws Exception {
		Optional<Motorista> motoristaOpt = motoristaRepository.findById(idMotorista);
		if(motoristaOpt.isEmpty()) {
			throw new NotFoundUser();
		}
		MotoristaDTO motorista = new MotoristaDTO();
		motorista.setId(idMotorista);
		motorista.setCpf(motoristaOpt.get().getCpf());
		motorista.setLogin(motoristaOpt.get().getLogin());
		motorista.setNome(motoristaOpt.get().getNome());
		motoristaRepository.deleteById(idMotorista);
		return motorista;
	}

}
