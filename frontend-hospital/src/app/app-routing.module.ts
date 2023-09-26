import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotAuthGuard } from './guards/not-auth/not-auth.guard';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'usuarios' },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
    canActivate: [NotAuthGuard],
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./pages/usuario/usuario.module').then((m) => m.UsuarioModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'ambulancias',
    loadChildren: () =>
      import('./pages/ambulancia/ambulancia.module').then(
        (m) => m.AmbulanciaModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'chamados',
    loadChildren: () =>
      import('./pages/chamado/chamado.module').then((m) => m.ChamadoModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
