package com.lts.backend.models.objetos;

import com.lts.backend.enums.errors.ErroChamado;
import com.lts.backend.enums.errors.ErrosGenericos;
import com.lts.backend.models.Motorista;

import lombok.Data;

@Data
public class MotoristaEnumErro {
    
    private Motorista motorista;
    private ErrosGenericos errosGenericos;
    private ErroChamado erroChamado;
}
