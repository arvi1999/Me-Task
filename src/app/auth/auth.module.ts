import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../material';
import { CookieService } from 'ngx-cookie-service';

const routes : Routes = [
  {path:'auth', component: AuthComponent}
];


@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    DemoMaterialModule
  ],
  providers: [
    CookieService
  ],
  exports: [
    RouterModule
  ],
})
export class AuthModule { }
