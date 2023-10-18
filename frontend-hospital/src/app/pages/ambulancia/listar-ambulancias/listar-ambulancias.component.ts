import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Ambulancia } from 'src/app/models/ambulancia/ambulancia.model';
import { AmbulanciaService } from 'src/app/services/ambulancia/ambulancia.service';

@Component({
  selector: 'app-listar-ambulancias',
  templateUrl: './listar-ambulancias.component.html',
  styleUrls: ['./listar-ambulancias.component.scss']
})
export class ListarAmbulanciasComponent {
  columnsAmbulancias = ['id'];

  ambulancias: Ambulancia[] = [];
  tableAmbulancias = new MatTableDataSource<Ambulancia>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private ambulanciaService: AmbulanciaService, private rota: Router) {}

  ngOnInit(): void {
    this.getAllAmbulancias();
  }
  ngAfterViewInit(): void {
    // this.tableAmbulancias.sort = this.sort;
    this.tableAmbulancias.paginator = this.paginator;
  }

  getAllAmbulancias() {
    this.ambulanciaService.getAllAmbulancias().subscribe({
      next: (ambulancias) => {
        this.ambulancias = ambulancias;
        this.tableAmbulancias = new MatTableDataSource<Ambulancia>(ambulancias);
        this.tableAmbulancias.sort = this.sort
      },
    });
  }

  filterAmbulancia(value: string) {
    this.tableAmbulancias.filter = value.trim().toLowerCase();
  }
}
