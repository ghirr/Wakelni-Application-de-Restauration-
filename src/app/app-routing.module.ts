import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddChefComponent } from './composants/add-chef/add-chef.component';
import { AddPlatsComponent } from './composants/add-plats/add-plats.component';
import { ChefsTabsComponent } from './composants/admin/chefs-tabs/chefs-tabs.component';
import { PlatsTabComponent } from './composants/admin/plats-tab/plats-tab.component';
import { TablesTabComponent } from './composants/admin/tables-tab/tables-tab.component';
import { UserTabComponent } from './composants/admin/user-tab/user-tab.component';
import { ChefsComponent } from './composants/chefs/chefs.component';
import { DashadminComponent } from './composants/dashadmin/dashadmin.component';
import { ErrorPageComponent } from './composants/error-page/error-page.component';
import { HomeComponent } from './composants/home/home.component';
import { LoginComponent } from './composants/login/login.component';
import { MenuComponent } from './composants/menu/menu.component';
import { SignUpComponent } from './composants/sign-up/sign-up.component';
import { TableBookComponent } from './composants/table-book/table-book.component';
import { TableBookedComponent } from './composants/table-booked/table-booked.component';
import { AuthAdminGuard } from './Guards/auth-admin.guard';
import { AuthUserGuard } from './Guards/auth-user.guard';
import { UserGuard } from './Guards/user.guard';

const routes: Routes = [
  
  {path:"",component:HomeComponent},
  {path:"signup",component:SignUpComponent,canActivate:[UserGuard]},
  {path:"login",component:LoginComponent,canActivate:[UserGuard]},
  {path:"chef",component:ChefsComponent},
  {path:"menu",component:MenuComponent},
  {path:"mesTables",component:TableBookedComponent,canActivate:[UserGuard,AuthUserGuard]},
  //add edit table
  {path:"table",component:TableBookComponent,canActivate:[UserGuard,AuthUserGuard]},
  {path:"table/:id",component:TableBookComponent,canActivate:[UserGuard,AuthUserGuard]},
  //add edit plat
  {path:"add-plat",component:AddPlatsComponent,canActivate:[UserGuard,AuthAdminGuard]},
  {path:"add-plat/:id",component:AddPlatsComponent,canActivate:[UserGuard,AuthAdminGuard]},
  //add edit chef
  {path:"add-chef",component:AddChefComponent,canActivate:[UserGuard,AuthAdminGuard]},
  {path:"add-chef/:id",component:AddChefComponent,canActivate:[UserGuard,AuthAdminGuard]},

  {path:"admin",component:DashadminComponent,canActivate:[UserGuard,AuthAdminGuard]},
  {path:"admin/:id",component:DashadminComponent,canActivate:[UserGuard,AuthAdminGuard],children:[{path:"users",component:UserTabComponent},{path:"tables",component:TablesTabComponent},{path:"plats",component:PlatsTabComponent},{path:"chefs",component:ChefsTabsComponent}]},
  {path:"**",pathMatch: 'full',component:ErrorPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
