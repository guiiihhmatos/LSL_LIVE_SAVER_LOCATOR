package com.lts.backend.repository.pagination;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.lts.backend.models.Ambulancia;

public interface IAmbulanciaRepositoryPagination extends PagingAndSortingRepository<Ambulancia, Long>{

}
