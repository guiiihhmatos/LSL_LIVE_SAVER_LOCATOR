package com.lts.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lts.backend.models.Ambulancia;

public interface IAmbulanciaRepository extends JpaRepository<Ambulancia, Long> {
	
	@Query("SELECT a FROM Ambulancia a "
			+ "WHERE a.motorista is null ")
    List<Ambulancia> findAllAmbulanciasDispMotorista();
	
	@Query("SELECT a FROM Ambulancia a "
			+ "WHERE a.estadoAmbulancia = 1")
    List<Ambulancia> findAllAmbulanciasDisp();
}
