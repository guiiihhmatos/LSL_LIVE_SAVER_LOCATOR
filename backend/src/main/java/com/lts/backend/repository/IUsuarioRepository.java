package com.lts.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lts.backend.models.Colaborador;

public interface IUsuarioRepository extends JpaRepository<Colaborador, Long>{

}
