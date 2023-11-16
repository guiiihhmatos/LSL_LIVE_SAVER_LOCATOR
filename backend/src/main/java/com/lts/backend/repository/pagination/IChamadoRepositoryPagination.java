package com.lts.backend.repository.pagination;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.lts.backend.models.Chamado;

public interface IChamadoRepositoryPagination extends PagingAndSortingRepository<Chamado, Long>{

	@Query("SELECT c FROM Chamado c WHERE CAST(c.id AS STRING) ILIKE %:filtro% OR "
			+ "CAST(c.dataInicioChamado AS STRING) ILIKE %:filtro% OR "
			+ "CAST(c.ocorrencia AS STRING) ILIKE %:filtro%")
	Page<Chamado> filterAll(String filtro, Pageable pageable);
}
