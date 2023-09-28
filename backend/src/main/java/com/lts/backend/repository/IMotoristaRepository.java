package com.lts.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lts.backend.models.Motorista;

public interface IMotoristaRepository extends JpaRepository<Motorista, Long> {

	Optional<Motorista> findByLogin(String login);
}
