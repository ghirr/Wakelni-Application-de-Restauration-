import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './composants/home/home.component';
import { HeaderComponent } from './composants/header/header.component';
import { FooterComponent } from './composants/footer/footer.component';
import { SignUpComponent } from './composants/sign-up/sign-up.component';
import { LoginComponent } from './composants/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChefsComponent } from './composants/chefs/chefs.component';
import { MenuComponent } from './composants/menu/menu.component';
import { TableBookComponent } from './composants/table-book/table-book.component';
import { HttpClientModule } from '@angular/common/http';
import { AddPlatsComponent } from './composants/add-plats/add-plats.component';
import { AddChefComponent } from './composants/add-chef/add-chef.component';
import { DashadminComponent } from './composants/dashadmin/dashadmin.component';
import { TableBookedComponent } from './composants/table-booked/table-booked.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ErrorPageComponent } from './composants/error-page/error-page.component';
import { UserTabComponent } from './composants/admin/user-tab/user-tab.component';
import { TablesTabComponent } from './composants/admin/tables-tab/tables-tab.component';
import { PlatsTabComponent } from './composants/admin/plats-tab/plats-tab.component';
import { ChefsTabsComponent } from './composants/admin/chefs-tabs/chefs-tabs.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SignUpComponent,
    LoginComponent,
    ChefsComponent,
    MenuComponent,
    TableBookComponent,
    AddPlatsComponent,
    AddChefComponent,
    DashadminComponent,
    TableBookedComponent,
    ErrorPageComponent,
    UserTabComponent,
    TablesTabComponent,
    PlatsTabComponent,
    ChefsTabsComponent,
    ConfirmDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    NgxPaginationModule 
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add this line
})
export class AppModule { }
