import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards';

import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { HomeComponent } from './home/home.component';
import { WarehouseSearchComponent } from './warehouse-search/warehouse-search.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'registration', component: RegistrationFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'warehouse-search', component: WarehouseSearchComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'superuser'] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }