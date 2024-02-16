package com.lts.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lts.backend.DTO.AmbulanciaDTO;
import com.lts.backend.DTO.EstadoAmbulanciaDTO;
import com.lts.backend.models.Ambulancia;
import com.lts.backend.models.Motorista;
import com.lts.backend.services.AmbulanciaService;
import com.lts.backend.services.MotoristaService;

@CrossOrigin
@RestController
@RequestMapping("/ambulancia")
public class AmbulanciaController {
	
	@Autowired
	private AmbulanciaService ambulanciaService;

	@Autowired
	private MotoristaService motoristaService;
	
	@GetMapping
	public Page<Ambulancia> buscarTodas(@PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
		return ambulanciaService.buscarTodas(pageable);
	}
	
	@GetMapping("filter/{value}")
	public Page<Ambulancia> filtrarAmbulancias(@PathVariable String value, @PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable){
		return ambulanciaService.filtrarAmbulancias(value, pageable);
	}

	@GetMapping("/total/ocupadas")
	public Long totalAmbulanciasOcupadas() {
		return ambulanciaService.totalAmbulanciasOcupadas();
	}

	@GetMapping("/total/disponiveis")
	public Long totalAmbulanciasDisponiveis() {
		return ambulanciaService.totalAmbulanciasDisponiveis();
	}

	@GetMapping("/total/inativas")
	public Long totalAmbulanciasInativas() {
		return ambulanciaService.totalAmbulanciasInativas();
	}
	
	@GetMapping("/motorista/disponiveis")
	public List<Ambulancia> buscarTodasDispMotorista() {
		return ambulanciaService.buscarTodasDispMotorista();
	}
	
	@GetMapping("/disponiveis")
	public List<Ambulancia> buscarTodasDisp() {
		return ambulanciaService.buscarTodasDisp();
	}
	
	@GetMapping("/{id}")
	public Optional<Ambulancia> buscarPorId(@PathVariable Long id){
		return ambulanciaService.buscarPorId(id);
	}

	// @GetMapping("/motorista/{id}")
	// public Optional<Ambulancia> buscarPorMotorista(@PathVariable Long id){

	// 	Motorista motorista = motorisa
	// 	return ambulanciaService.buscarPorMotorista(motorista);
	// }
	
	@PostMapping
	public ResponseEntity<Ambulancia> salvarAmbulancia(@RequestBody AmbulanciaDTO ambulanciaDTO) throws Exception {
		Ambulancia ambulancia = ambulanciaService.salvarAmbulancia(ambulanciaDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(ambulancia);

	}
	
	@PutMapping
	public ResponseEntity<Ambulancia> editarAmbulancia(@RequestBody AmbulanciaDTO ambulanciaDTO) throws Exception {
		Ambulancia ambulancia = ambulanciaService.editarAmbulancia(ambulanciaDTO);
		
		if(ambulancia !=  null)
		{
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(ambulancia);
		}

		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
	
	@PatchMapping("/alterar-estado")
	public ResponseEntity<Ambulancia> alterarEstadoAmbulancia(@RequestBody EstadoAmbulanciaDTO estadoAmbulanciaDTO) throws Exception {
		Ambulancia ambulancia = ambulanciaService.alterarEstado(estadoAmbulanciaDTO);

		if(ambulancia !=  null)
		{
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(ambulancia);
		}

		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

}
