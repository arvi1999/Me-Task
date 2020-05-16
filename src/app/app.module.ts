import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// import { TodolistComponent } from './todolist/todolist.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DemoMaterialModule } from './material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


const routes : Routes = [
  {path:'',pathMatch:'full',redirectTo:'auth'}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    TodoModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes),
    DemoMaterialModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
