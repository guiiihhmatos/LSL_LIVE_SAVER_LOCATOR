package com.lts.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lts.backend.models.HistoricoMotoristaAmbulancia;

public interface IHistoricoMotoristaRepository extends JpaRepository<HistoricoMotoristaAmbulancia, Long>{

}
