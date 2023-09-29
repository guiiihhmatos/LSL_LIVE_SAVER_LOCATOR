package com.lts.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lts.backend.DTO.AuthenticationDTO;
import com.lts.backend.DTO.LoginResponseUsuarioDTO;
import com.lts.backend.DTO.UsuarioDTO;
import com.lts.backend.config.TokenService;
import com.lts.backend.exception.error.NotFoundUser;
import com.lts.backend.exception.error.UserAlreadyExists;
import com.lts.backend.models.Usuario;
import com.lts.backend.models.UsuarioHospital;
import com.lts.backend.repository.IUsuarioRepository;

@Service
public class UsuarioService {
	
	@Autowired
	private IUsuarioRepository usuarioRepository;

	@Autowired
	private TokenService tokenService;
	
	public List<UsuarioHospital> findAll() {
		return usuarioRepository.findAll();
	}
	
	@Transactional
	public Optional<UsuarioHospital> loginExists(UsuarioDTO usuarioDTO) {
		return usuarioRepository.findByLogin(usuarioDTO.getLogin());
	}

	public LoginResponseUsuarioDTO login(AuthenticationDTO data) throws Exception {
		UsuarioHospital usuario = usuarioRepository.findByLogin(data.login()).orElseThrow();
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		if (!passwordEncoder.matches(data.password(), usuario.getPassword())) {
			throw new Exception("Senha não confere");
		}
		String token = tokenService.genTokenUsuario(usuario);
		LoginResponseUsuarioDTO response = new LoginResponseUsuarioDTO();
		response.setToken(token);
		response.setUsuario(usuario);
		return response;
	}

	@Transactional
	public Usuario salvarUsuario(UsuarioDTO usuarioDTO) throws Exception {
		Optional<UsuarioHospital> usuarioOpt = usuarioRepository.findByLogin(usuarioDTO.getLogin());
		if (usuarioOpt.isPresent()) {
			throw new UserAlreadyExists();
		}
		String encryptedPassword = new BCryptPasswordEncoder().encode(usuarioDTO.getPassword());
		UsuarioHospital usuario = new UsuarioHospital();
		usuario.setNome(usuarioDTO.getNome());
		usuario.setCpf(usuarioDTO.getCpf());
		usuario.setLogin(usuarioDTO.getLogin());
		usuario.setRole(usuarioDTO.getRole());
		usuario.setPassword(encryptedPassword);
		usuarioRepository.save(usuario);
		return usuario;
	}
	
	@Transactional
	public Usuario editarUsuario(UsuarioDTO usuarioDTO) throws Exception {
		Optional<UsuarioHospital> usuarioOpt = usuarioRepository.findById(usuarioDTO.getId());
		if (usuarioOpt.isEmpty()) {
			throw new NotFoundUser();
		}
		
		String encryptedPassword = new BCryptPasswordEncoder().encode(usuarioDTO.getPassword());
		UsuarioHospital usuario = new UsuarioHospital();
		usuario.setId(usuarioDTO.getId());
		usuario.setNome(usuarioDTO.getNome());
		usuario.setCpf(usuarioDTO.getCpf());
		usuario.setLogin(usuarioDTO.getLogin());
		usuario.setRole(usuarioDTO.getRole());
		usuario.setPassword(encryptedPassword);
		usuarioRepository.save(usuario);
		return usuario;
	}
}
