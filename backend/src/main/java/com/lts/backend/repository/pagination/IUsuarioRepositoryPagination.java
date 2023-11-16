package com.lts.backend.repository.pagination;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.lts.backend.DTO.UsuarioHospitalFilter;
import com.lts.backend.models.UsuarioHospital;

public interface IUsuarioRepositoryPagination extends PagingAndSortingRepository<UsuarioHospital, Long>{
	@Query(nativeQuery = true, value =  "SELECT u.id AS id, u.nr_cpf AS cpf, u.ds_login AS login, u.nome AS nome, u.ds_senha AS senha, r.ds_role AS role "
			+ "FROM tb_usuario u LEFT JOIN tb_role r ON r.cd_role = u.role " 
			+ "WHERE (CAST(u.id AS TEXT) ILIKE %:valor% OR "
			+ "CAST(u.nr_cpf AS TEXT) ILIKE %:valor% OR " 
			+ "u.ds_login ILIKE %:valor% OR "
			+ "u.nome ILIKE %:valor% OR " 
			+ "CAST(r.ds_role as TEXT) ILIKE %:valor%) "
			+ "AND u.role <> 1")
	Page<UsuarioHospitalFilter> filterAll(@Param("valor") String valor, Pageable pageable);
}
