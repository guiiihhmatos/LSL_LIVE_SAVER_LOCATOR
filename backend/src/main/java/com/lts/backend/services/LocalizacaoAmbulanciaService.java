package com.lts.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lts.backend.models.LocalizacaoAmbulancia;
import com.lts.backend.repository.ILocalizacaoAmbulanciaRepository;

@Service
public class LocalizacaoAmbulanciaService {

	@Autowired
	private ILocalizacaoAmbulanciaRepository localizacaoRepository;
	
	public List<LocalizacaoAmbulancia> findAll() {
		return localizacaoRepository.findAll();
	}
	
}
