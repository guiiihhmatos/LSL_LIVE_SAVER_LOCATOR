package com.lts.backend.repository;


import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lts.backend.models.UsuarioHospital;

public interface IUsuarioRepository extends JpaRepository<UsuarioHospital, Long> {

	Optional<UsuarioHospital> findByLogin(String login);
	
	@Query(nativeQuery = false, value = "SELECT u FROM UsuarioHospital u WHERE u.role <> 1")
	Page<UsuarioHospital> findAll(Pageable pageable);
}
