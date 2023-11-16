package com.lts.backend.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lts.backend.models.Notificacao;
import com.lts.backend.repository.INotificacaoRepository;

@Service
public class NotificacaoService {

    @Autowired
    private INotificacaoRepository notificacaoRepository;

    public List<Notificacao> getNotificacoesNaoLidas() {
        return notificacaoRepository.findByNova(true);
    }

    public void marcarComoLida(Long id) {
        Optional<Notificacao> notificacaoOptional = notificacaoRepository.findById(id);
        notificacaoOptional.ifPresent(notificacao -> {
            notificacao.setNova(false);;
            notificacaoRepository.save(notificacao);
        });
    }

    public Notificacao criarNotificacao(String msg) {
        Notificacao notificacao = new Notificacao();
        notificacao.setMensagem(msg);
        notificacao.setNova(true);
        notificacao.setData(new Date());
        return notificacaoRepository.save(notificacao);
    }
}

