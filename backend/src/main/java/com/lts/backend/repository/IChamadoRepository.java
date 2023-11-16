package com.lts.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lts.backend.models.Chamado;

public interface IChamadoRepository extends JpaRepository<Chamado, Long>{
	

	@Query("SELECT COUNT(c) FROM Chamado c "
			+ "WHERE c.estadoChamado = 0")
    Long totalChamadosAcaminho();

	@Query("SELECT COUNT(c) FROM Chamado c "
			+ "WHERE c.estadoChamado = 1")
    Long totalChamadosRetornando();

	@Query("SELECT COUNT(c) FROM Chamado c WHERE c.estadoChamado = 2")
    Long totalChamadosFinalizado();

	@Query("SELECT c FROM Chamado c JOIN c.ambulancias a WHERE a.motorista.id = :motoristaId AND c.dataFimChamado IS NULL")
    List<Chamado> findCurrentChamadosByMotoristaId(Long motoristaId);
}
