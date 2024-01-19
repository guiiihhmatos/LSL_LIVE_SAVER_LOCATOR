package com.lts.backend.controller;

import java.util.List;

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

import com.lts.backend.DTO.ChamadoDTO;
import com.lts.backend.DTO.EstadoChamadoDTO;
import com.lts.backend.DTO.TempoMedioChamadoDTO;
import com.lts.backend.models.Chamado;
import com.lts.backend.services.ChamadoService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/chamado")
public class ChamadoController {
	
	@Autowired
	private ChamadoService chamadoService;
	
	/*@GetMapping
	public List<Chamado> listarTodos() {
		return chamadoService.listarChamadosComAmbulancias();
	}*/
	
	@GetMapping("/filter/{value}")
	public Page<Chamado> filtrarChamados(@PathVariable String value, @PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable){
		return chamadoService.filtrarChamados(value, pageable);
	}

	@GetMapping("/total/acaminho")
	public Long totalChamadosAcaminho() {
		return chamadoService.totalChamadosAcaminho();
	}

	@GetMapping("/total/retornando")
	public Long totalChamadosRetornando() {
		return chamadoService.totalChamadosRetornando();
	}

	@GetMapping("/total/finalizado")
	public Long totalChamadosFinalizado() {
		return chamadoService.totalChamadosFinalizado();
	}
	
	@GetMapping()
    public Page<Chamado> listarChamadosComOrdenacaoEPage(@PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        return chamadoService.listarChamadosComAmbulancias(pageable);
    }

	@GetMapping("/motorista/{motoristaId}")
    public List<Chamado> getChamadoAtualMotorista(@PathVariable Long motoristaId) {
        return chamadoService.findCurrentChamadosByMotoristaId(motoristaId);
    }

	@GetMapping("/tempo-medio")
	public TempoMedioChamadoDTO getTempoMedioChamado(){
		return chamadoService.calcularTempoMedio();
	}

	@PostMapping
	public ResponseEntity<ChamadoDTO> salvarChamado(@RequestBody ChamadoDTO chamadoDTO) throws Exception {
		Chamado chamado = chamadoService.salvarChamado(chamadoDTO);
		return ResponseEntity.status(HttpStatus.CREATED).build();

	}
	
	@PutMapping
	public ResponseEntity<Chamado> editarChamado(@RequestBody ChamadoDTO chamadoDTO) throws Exception {
		Chamado chamado = chamadoService.editarChamado(chamadoDTO);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(chamado);
	}
	
	@PatchMapping("/alterar-estado")
	public ResponseEntity<Chamado> alterarEstado(@RequestBody EstadoChamadoDTO estadoChamadoDTO) throws Exception {
		Chamado chamado = chamadoService.alterarEstado(estadoChamadoDTO);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(chamado);
	}
}
