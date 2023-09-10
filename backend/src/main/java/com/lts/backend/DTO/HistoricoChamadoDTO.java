package com.lts.backend.DTO;

import java.util.Date;

import lombok.Data;
@Data
public class HistoricoChamadoDTO {
	 private Long id;
	 private Date data;
	 private Date duracao;
	 private ChamadoDTO Chamado;
}
