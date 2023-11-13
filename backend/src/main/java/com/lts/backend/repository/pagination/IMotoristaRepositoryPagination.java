package com.lts.backend.repository.pagination;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.lts.backend.models.Motorista;

public interface IMotoristaRepositoryPagination extends PagingAndSortingRepository<Motorista, Long>{

}
