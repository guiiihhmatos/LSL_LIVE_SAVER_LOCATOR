package com.lts.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lts.backend.models.Localizacao;

public interface ILocalizacao extends JpaRepository<Localizacao, Long>{

}
