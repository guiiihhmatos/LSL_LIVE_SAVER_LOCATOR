package com.lts.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lts.backend.models.LocalChamado;

public interface ILocalChamado extends JpaRepository<LocalChamado, Long>{

}
