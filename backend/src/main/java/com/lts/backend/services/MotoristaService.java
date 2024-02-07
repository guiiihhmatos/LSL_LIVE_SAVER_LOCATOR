package com.lts.backend.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lts.backend.DTO.AmbulanciaDTO;
import com.lts.backend.DTO.AuthenticationMotoristaDTO;
import com.lts.backend.DTO.LoginResponseMotoristaDTO;
import com.lts.backend.DTO.MotoristaAmbulanciaDTO;
import com.lts.backend.DTO.MotoristaDTO;
import com.lts.backend.DTO.MotoristaFilter;
import com.lts.backend.config.TokenService;
import com.lts.backend.enums.Roles;
import com.lts.backend.exception.error.NotFoundAmbulancia;
import com.lts.backend.exception.error.NotFoundUser;
import com.lts.backend.exception.error.UserAlreadyExists;
import com.lts.backend.models.Ambulancia;
import com.lts.backend.models.HistoricoMotoristaAmbulancia;
import com.lts.backend.models.Motorista;
import com.lts.backend.models.Usuario;
import com.lts.backend.models.UsuarioHospital;
import com.lts.backend.repository.IMotoristaRepository;
import com.lts.backend.repository.IUsuarioRepository;
import com.lts.backend.repository.pagination.IMotoristaRepositoryPagination;

@Service
public class MotoristaService {

	@Autowired
	private IMotoristaRepository motoristaRepository;
	
	@Autowired
	private IMotoristaRepositoryPagination motoristaRepositoryPagination;
	
	@Autowired
	private IUsuarioRepository usuarioRepository;
	
	@Autowired
	private HistoricoMotoristaService historicoMotoristaService;
	
	@Autowired
	private AmbulanciaService ambulanciaService;
	
	@Autowired
	private TokenService tokenService;

	public Page<Motorista> findAll(Pageable pageable) {
		return motoristaRepositoryPagination.findAll(pageable);
	}
	
	public Page<MotoristaFilter> filtrarMotoristas(String value, Pageable pageable){
		return motoristaRepositoryPagination.filterAll(value, pageable);
	}

	public List<Motorista> findAllLogged(){
		return motoristaRepository.findAllLogged();
	}

	@Transactional
	public Optional<Motorista> loginExists(MotoristaDTO motoristaDTO) {
		return motoristaRepository.findByLogin(motoristaDTO.getLogin());
	}

	public LoginResponseMotoristaDTO login(AuthenticationMotoristaDTO data) throws Exception {
		Motorista motorista = motoristaRepository.findByLogin(data.login()).orElseThrow(NotFoundUser::new);
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		if (!passwordEncoder.matches(data.password(), motorista.getPassword())) {
			throw new Exception("Senha não confere");
		}
		
		HistoricoMotoristaAmbulancia historico = new HistoricoMotoristaAmbulancia();
		
		historico.setData(new Date());
		historico.setIdAmbulancia(data.idAmbulancia());
		historico.setIdMotorista(motorista.getId());
		
		
		MotoristaAmbulanciaDTO motoristaDTO = new MotoristaAmbulanciaDTO(data.idAmbulancia(), motorista);
		
		ambulanciaService.alterarMotorista(motoristaDTO);
		historicoMotoristaService.salvarHistorico(historico);
		
		String token = tokenService.genTokenMotorista(motorista);
		LoginResponseMotoristaDTO response = new LoginResponseMotoristaDTO();
		response.setToken(token);
		response.setMotorista(motorista);
		response.setIdAmbulanciaLong(data.idAmbulancia());
		return response;
	}

	@Transactional
	public Usuario salvarMotorista(MotoristaDTO motoristaDTO) throws Exception {
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
		// salvar um usuario - GAMBIARRA
		UsuarioHospital motoristaUsuario = new UsuarioHospital();
		motoristaUsuario.setNome(motoristaDTO.getNome());
		motoristaUsuario.setCpf(motoristaDTO.getCpf());
		motoristaUsuario.setLogin(motoristaDTO.getLogin());
		motoristaUsuario.setPassword(encryptedPassword);
		motoristaUsuario.setRole(Roles.USER_AMBULANCIA);
		usuarioRepository.save(motoristaUsuario);
		
		return motorista;
	}
	
	@Transactional
	public Usuario editarMotorista(MotoristaDTO motoristaDTO) throws Exception {
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
	public MotoristaDTO removerMotorista(Long idMotorista) throws Exception {
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
	
	@Transactional
	public Motorista logout(Long idMotorista) throws Exception {
		Optional<Motorista> motorista = motoristaRepository.findById(idMotorista);
		if(motorista.isEmpty()) {
			throw new NotFoundUser();
		}
		Optional<Ambulancia> ambulancia = ambulanciaService.buscarPorMotorista(motorista.get());
		if(ambulancia.isEmpty()) {
			throw new NotFoundAmbulancia();
		}
		ambulancia.get().setMotorista(null);
		AmbulanciaDTO ambulanciaDTO = new AmbulanciaDTO();
		ambulanciaDTO.setEstadoAmbulancia(ambulancia.get().getEstadoAmbulancia());
		ambulanciaDTO.setId(ambulancia.get().getId());
		ambulanciaDTO.setLatitude(ambulancia.get().getLatitude());
		ambulanciaDTO.setLongitude(ambulancia.get().getLongitude());
		ambulanciaDTO.setPlaca(ambulancia.get().getPlaca());
		
		ambulanciaService.editarAmbulancia(ambulanciaDTO);
		
		return motorista.get();
		
	}

}
