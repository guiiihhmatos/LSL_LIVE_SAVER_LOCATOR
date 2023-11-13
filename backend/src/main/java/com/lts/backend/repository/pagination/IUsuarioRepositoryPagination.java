package com.lts.backend.repository.pagination;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.lts.backend.models.UsuarioHospital;

public interface IUsuarioRepositoryPagination extends PagingAndSortingRepository<UsuarioHospital, Long>{
	
}
