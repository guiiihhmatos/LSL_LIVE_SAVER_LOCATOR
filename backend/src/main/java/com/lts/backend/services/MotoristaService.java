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
			throw new Exception("Login já existe");
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

}
