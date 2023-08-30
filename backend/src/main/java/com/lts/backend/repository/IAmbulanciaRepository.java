package com.lts.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lts.backend.models.Ambulancia;

public interface IAmbulanciaRepository extends JpaRepository<Ambulancia, Long> {

}
