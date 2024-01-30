package com.lts.backend.models.objetos;

import com.lts.backend.enums.errors.ErrosGenericos;
import com.lts.backend.models.Chamado;

import lombok.Data;

@Data
public class ChamadoEnumErro {
    
    private Chamado chamado;
    private ErrosGenericos errosGenericos;

    // public ChamadoEnumErro(Chamado chamado, ErrosGenericos errosGenericos){
    //     this.chamado = chamado;
    //     this.errosGenericos = errosGenericos;
    // }

    public boolean hasErrors(){
        return getErrosGenericos() != null;
    }
}
