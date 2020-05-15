import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
// import { ItemDetailsComponent } from '../item-details/item-details.component';
import { Routes, RouterModule } from '@angular/router';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemFormComponent } from './item-form/item-form.component'
import { ApiService } from '../api.service';
import { DemoMaterialModule } from '../material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

const routes : Routes = [
  {path:'todo', component: TodoComponent}
];


@NgModule({
  declarations: [TodoComponent, ItemDetailsComponent, ItemListComponent, ItemFormComponent,],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FontAwesomeModule,
    DemoMaterialModule
  ],
  providers: [
    ApiService
  ],
  exports: [
    RouterModule
  ],
})
export class TodoModule { }
