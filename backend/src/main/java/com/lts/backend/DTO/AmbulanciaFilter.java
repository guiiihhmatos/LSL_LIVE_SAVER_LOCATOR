package com.lts.backend.DTO;

import java.math.BigDecimal;

import com.lts.backend.models.Motorista;

public interface AmbulanciaFilter {
	Integer getId();
	String getPlaca();
	String getEstadoAmbulancia();
	BigDecimal getLatitude();
	BigDecimal getLongitude();
	Motorista getMotorista();
}
