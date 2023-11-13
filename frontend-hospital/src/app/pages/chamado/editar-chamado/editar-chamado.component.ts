import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ambulancia } from 'src/app/models/ambulancia/ambulancia.model';
import { Chamado, EstadosChamado, TiposEmergencia, formChamado } from 'src/app/models/chamado/chamado.model';
import { AmbulanciaService } from 'src/app/services/ambulancia/ambulancia.service';
import { CepService } from 'src/app/services/cep/cep.service';
import { ChamadoService } from 'src/app/services/chamado/chamado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-chamado',
  templateUrl: './editar-chamado.component.html',
  styleUrls: ['./editar-chamado.component.scss']
})
export class EditarChamadoComponent {
  ambulanciasDisponiveis: Ambulancia[] = [];
  formChamado: FormGroup;
  ambulanciasSalvas: Ambulancia[] = [];
  tiposEmergencia: string[] = [];
  estadosChamado: string[] = [];
  passedChamado: Chamado;

  autocomplete: google.maps.places.Autocomplete | undefined;

  @ViewChild('mapsSearch', { static: true }) search!: ElementRef;
  constructor(
    private fb: FormBuilder,
    private chamadoService: ChamadoService,
    private ambulanciaService: AmbulanciaService,
    private cepService: CepService,
    private rota: Router
  ) {
    this.passedChamado = history.state.chamado;
    this.ambulanciasSalvas = this.passedChamado.ambulancias;

    this.formChamado = fb.group({
      id: [null, Validators.required],
      ocorrencia: [null, [Validators.required]],
      estadoChamado: ["A_CAMINHO", [Validators.required]],
      localChamado: fb.group({
        endereco: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
        numero: [null],
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required]],
        cep: [null, [Validators.required]],
        latitude: [null],
        longitude: [null],
      }),
      tipoEmergencia: ["", [Validators.required]],
      ambulanciaIds: [""],
    });
    for (let tipo in TiposEmergencia) {
      if (isNaN(+tipo)) {
        this.tiposEmergencia.push(tipo);
      }
    }
    for (let estado in EstadosChamado) {
      if (isNaN(+estado)) {
        this.estadosChamado.push(estado);
      }
    }
    this.setValues(this.passedChamado);

  }

  setValues(chamado: Chamado) {

    this.formChamado.patchValue({
      id: chamado.id,
      ocorrencia: chamado.ocorrencia,
      estadoChamado: chamado.estadoChamado,
      localChamado: chamado.localChamado,
      tipoEmergencia: chamado.tipoEmergencia,
    });

  }

  ngOnInit(): void {
    this.getAllAmbulanciasDisponiveis();

    this.formChamado.controls['ambulanciaIds'].valueChanges.subscribe(ambulancia => {
      if (!this.ambulanciasSalvas.includes(ambulancia) && ambulancia != '') this.ambulanciasSalvas.push(ambulancia);
    })
  }

  ngAfterViewInit(): void {
    this.autocomplete = new google.maps.places.Autocomplete(this.search.nativeElement);

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();
      const components = place?.address_components;

      if (components) {
        this.formChamado.patchValue({
          localChamado: {
            // numero: components[0].long_name,
            endereco: components[0]?.long_name,
            bairro: components[1]?.long_name,
            cidade: components[2]?.long_name,
            estado: components[3]?.long_name,
            cep: components[5]?.long_name,
            latitude: place?.geometry?.location?.lat(),
            longitude: place?.geometry?.location?.lng(),
          }
        })
      }

    })
  }

  removerAmbulancia(ambulancia: Ambulancia) {
    this.formChamado.patchValue({ ambulanciaIds: '' });
    this.ambulanciasSalvas.splice(this.ambulanciasSalvas.indexOf(ambulancia), 1);
    this.ambulanciasDisponiveis.push(ambulancia);
  }

  validateForm(form: FormGroup) {
    const formLocalChamado = form.controls['localChamado'] as FormGroup;

    if (form.invalid) {
      Swal.fire({ icon: 'error', title: 'Peencha todos os campos' });
    } else if (this.ambulanciasSalvas.length < 1) {
      Swal.fire({ icon: 'error', title: 'Relacione alguma ambulância disponível' });
    } else if (!formLocalChamado.controls['latitude'] || !formLocalChamado.controls['longitude']) {
      Swal.fire({ icon: 'error', title: 'Não foi possivel obter informações do local, tente buscar novamente' });
    } else {
      this.editChamado(form.value);
    }
  }

  getAllAmbulanciasDisponiveis() {
    this.ambulanciaService.getAllAmbulanciasDisponiveis().subscribe({
      next: (ambulancias) => {
        this.ambulanciasDisponiveis = ambulancias;
      },
    });
  }

  editChamado(chamado: formChamado) {

    let aux: number[] = [];
    this.ambulanciasSalvas.forEach(a => aux.push(a.id))
    chamado.ambulanciaIds = aux;
    this.chamadoService.editChamado(chamado).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Chamado salvo com sucesso',
          timer: 3000,
          timerProgressBar: true,
        }).then(() => this.rota.navigate(['../chamados']));
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao salvar chamado',
          text: err?.error?.message,
        });
      },
    });
  }

  //------------- Método de busca de CEP e liberação de campos sem dados ----------------------
  getCep(cep: number) {
    this.cepService.getCep(cep).subscribe((value) => {
      const localChamado = {
        cep: cep,
        endereco: value.logradouro.slice(value.logradouro.indexOf(' ')).trim(),
        bairro: value.bairro,
        cidade: value.localidade,
        estado: value.uf
      };

      this.formChamado.patchValue({
        localChamado: localChamado,
      });


    });
  }

}
