package com.lts.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lts.backend.models.Chamado;

public interface IChamadoRepository extends JpaRepository<Chamado, Long>{

}
