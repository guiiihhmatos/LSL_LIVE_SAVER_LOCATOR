package com.lts.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lts.backend.models.Ambulancia;
import com.lts.backend.models.Chamado;
import com.lts.backend.models.Motorista;

public interface IChamadoRepository extends JpaRepository<Chamado, Long>{

	@Query(value = "SELECT c.* FROM tb_chamado c JOIN tb_chamado_ambulancia ca ON c.cd_chamado = ca.cd_chamado JOIN tb_ambulancia a ON ca.cd_ambulancia = a.cd_ambulancia WHERE a.cd_ambulancia = :ambulanciaId AND c.dt_fim_chamdo IS NULL", nativeQuery = true)
	Optional<Chamado> findByAmbulancia(Long ambulanciaId);

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
