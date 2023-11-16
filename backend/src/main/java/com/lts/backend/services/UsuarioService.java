package com.lts.backend.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lts.backend.DTO.AuthenticationDTO;
import com.lts.backend.DTO.LoginResponseUsuarioDTO;
import com.lts.backend.DTO.UsuarioDTO;
import com.lts.backend.DTO.UsuarioHospitalFilter;
import com.lts.backend.config.TokenService;
import com.lts.backend.exception.error.NotFoundUser;
import com.lts.backend.exception.error.UserAlreadyExists;
import com.lts.backend.models.Usuario;
import com.lts.backend.models.UsuarioHospital;
import com.lts.backend.repository.IUsuarioRepository;
import com.lts.backend.repository.pagination.IUsuarioRepositoryPagination;


@Service
public class UsuarioService {
	
	@Autowired
	private IUsuarioRepository usuarioRepository;
	
	@Autowired
	private IUsuarioRepositoryPagination usuarioRepositoryPagination;

	@Autowired
	private TokenService tokenService;
	
	public Page<UsuarioHospital> findAll(Pageable pageable) {
		return usuarioRepository.findAll(pageable);
	}
	
	@Transactional
	public Optional<UsuarioHospital> loginExists(UsuarioDTO usuarioDTO) {
		return usuarioRepository.findByLogin(usuarioDTO.getLogin());
	}

	public LoginResponseUsuarioDTO login(AuthenticationDTO data) throws Exception {
		UsuarioHospital usuario = usuarioRepository.findByLogin(data.login()).orElseThrow(NotFoundUser::new);
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
	
	public Page<UsuarioHospitalFilter> filtrarUsuario(String value, Pageable pageable) throws Exception {
		return  usuarioRepositoryPagination.filterAll(value, pageable);
	}
}
