package com.lts.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.lts.backend.models.Chamado;

public interface IChamadoRepository extends JpaRepository<Chamado, Long>{
	
	@Query("SELECT c FROM Chamado c LEFT JOIN FETCH c.ambulancias")
    List<Chamado> findAllWithAmbulancias();
	
	@Query("SELECT c FROM Chamado c LEFT JOIN FETCH c.ambulancias")
	Page<Chamado> findAll(Pageable pageable);
}
