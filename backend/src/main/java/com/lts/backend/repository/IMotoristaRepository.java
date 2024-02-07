package com.lts.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lts.backend.models.Motorista;

public interface IMotoristaRepository extends JpaRepository<Motorista, Long> {

	Optional<Motorista> findByLogin(String login);

	@Query(nativeQuery = true, 
			value = "SELECT M.id AS id, M.nr_cpf, M.ds_login, M.nome, M.ds_senha, a.cd_ambulancia "
						+ "FROM TB_MOTORISTA M "
						+ "JOIN TB_AMBULANCIA A ON A.CD_MOTORISTA = M.ID")
	List<Motorista> findAllLogged();
}
