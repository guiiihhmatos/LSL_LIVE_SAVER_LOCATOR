package com.lts.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lts.backend.models.Usuario;

public interface IUsuario extends JpaRepository<Usuario, Long>{

}
