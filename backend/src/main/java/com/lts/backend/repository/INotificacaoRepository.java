package com.lts.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.lts.backend.models.Notificacao;

public interface INotificacaoRepository extends JpaRepository<Notificacao, Long> {
    List<Notificacao> findByNova(boolean nova);
}

