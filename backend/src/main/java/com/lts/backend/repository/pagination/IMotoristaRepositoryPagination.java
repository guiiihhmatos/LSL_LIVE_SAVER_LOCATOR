package com.lts.backend.repository.pagination;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.lts.backend.DTO.MotoristaFilter;
import com.lts.backend.models.Motorista;

public interface IMotoristaRepositoryPagination extends PagingAndSortingRepository<Motorista, Long>{

	@Query(nativeQuery = true, value =  "SELECT u.id AS id, u.nr_cpf AS cpf, u.ds_login AS login, u.nome AS nome, u.ds_senha AS senha "
			+ "FROM tb_motorista u " 
			+ "WHERE CAST(u.id AS TEXT) ILIKE %:valor% OR "
			+ "CAST(u.nr_cpf AS TEXT) ILIKE %:valor% OR " 
			+ "u.ds_login ILIKE %:valor% OR "
			+ "u.nome ILIKE %:valor%")
	Page<MotoristaFilter> filterAll(@Param("valor") String valor, Pageable pageable);
}
