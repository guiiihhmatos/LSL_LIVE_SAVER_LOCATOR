package com.lts.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lts.backend.models.UsuarioHospital;

public interface IUsuarioRepository extends JpaRepository<UsuarioHospital, Long>{
	
	Optional<UsuarioHospital> findByLogin(String login);

}
