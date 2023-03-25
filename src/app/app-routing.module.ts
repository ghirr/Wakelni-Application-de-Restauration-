import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddChefComponent } from './composants/add-chef/add-chef.component';
import { AddPlatsComponent } from './composants/add-plats/add-plats.component';
import { ChefsComponent } from './composants/chefs/chefs.component';
import { DashadminComponent } from './composants/dashadmin/dashadmin.component';
import { HomeComponent } from './composants/home/home.component';
import { LoginComponent } from './composants/login/login.component';
import { MenuComponent } from './composants/menu/menu.component';
import { SignUpComponent } from './composants/sign-up/sign-up.component';
import { TableBookComponent } from './composants/table-book/table-book.component';
import { TableBookedComponent } from './composants/table-booked/table-booked.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"signup",component:SignUpComponent},
  {path:"login",component:LoginComponent},
  {path:"chef",component:ChefsComponent},
  {path:"menu",component:MenuComponent},
  {path:"mesTables",component:TableBookedComponent},
  //add edit table
  {path:"table",component:TableBookComponent},
  {path:"table/:id",component:TableBookComponent},
  //add edit plat
  {path:"add-plat",component:AddPlatsComponent},
  {path:"add-plat/:id",component:AddPlatsComponent},
  //add edit chef
  {path:"add-chef",component:AddChefComponent},
  {path:"add-chef/:id",component:AddChefComponent},


  {path:"admin",component:DashadminComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
