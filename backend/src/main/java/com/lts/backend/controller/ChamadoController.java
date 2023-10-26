package com.lts.backend.controller;

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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lts.backend.DTO.ChamadoDTO;
import com.lts.backend.DTO.EstadoChamadoDTO;
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
	
	@GetMapping()
    public Page<Chamado> listarChamadosComOrdenacaoEPage(@PageableDefault(sort = "ocorrencia", direction = Sort.Direction.ASC) Pageable pageable) {
        return chamadoService.listarChamadosComAmbulancias(pageable);
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
