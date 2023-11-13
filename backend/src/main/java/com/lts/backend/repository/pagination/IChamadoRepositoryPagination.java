package com.lts.backend.repository.pagination;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.lts.backend.models.Chamado;

public interface IChamadoRepositoryPagination extends PagingAndSortingRepository<Chamado, Long>{

}
