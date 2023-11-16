package com.lts.backend.repository.pagination;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.lts.backend.enums.EstadoAmbulancia;
import com.lts.backend.models.Ambulancia;

public interface IAmbulanciaRepositoryPagination extends PagingAndSortingRepository<Ambulancia, Long> {

	@Query("SELECT a FROM Ambulancia a " +
	           "LEFT JOIN a.motorista m " +
	           "WHERE CAST(a.id AS STRING) ILIKE %:filtro% OR " +
	           "CAST(a.placa AS STRING) ILIKE %:filtro%")	
	Page<Ambulancia> filterAll(@Param("filtro") String filtro, Pageable pageable);
	
	Page<Ambulancia> findByEstadoAmbulancia(EstadoAmbulancia estadoAmbulancia, Pageable pageable);
}
