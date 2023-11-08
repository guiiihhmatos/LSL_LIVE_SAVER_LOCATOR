import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotAuthGuard } from './guards/not-auth/not-auth.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { CaminhoAmbulanciaChamadoComponent } from './shared/caminho-ambulancia-chamado/caminho-ambulancia-chamado.component';

const routes: Routes = [
  {path: 'directions', pathMatch: 'full', component: CaminhoAmbulanciaChamadoComponent},
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
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
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
