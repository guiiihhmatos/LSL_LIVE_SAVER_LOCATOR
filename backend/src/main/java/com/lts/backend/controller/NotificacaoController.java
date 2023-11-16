package com.lts.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lts.backend.models.Notificacao;
import com.lts.backend.services.NotificacaoService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/notificacao")
public class NotificacaoController {
    
    @Autowired
    private NotificacaoService notificacaoService;

    @GetMapping
    public List<Notificacao> getNotificacoesNaoLidas() {
        return notificacaoService.getNotificacoesNaoLidas();
    }

    @PostMapping("/{msg}")
    public Notificacao criarNotificacao(@RequestBody Object o, @PathVariable String msg) throws Exception {
        return notificacaoService.criarNotificacao(msg);
    }

    @PutMapping("/{id}/marcarComoLida")
    public void marcarComoLida(@PathVariable Long id) {
        notificacaoService.marcarComoLida(id);
    }
}

