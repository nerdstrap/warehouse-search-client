import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FileDropDirective, FileSelectDirective } from "ng2-file-upload";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CustomMaterialModule } from "./material.module";
import { AppRoutingModule } from './app-routing.module';
import { AuthHttpInterceptor } from './shared/interceptors';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './home/home.component';
import { WarehouseSearchComponent } from './warehouse-search/warehouse-search.component';
import { ConfigService } from './shared/utils';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FileSelectDirective,
    FileDropDirective,
    RegistrationFormComponent,
    LoginFormComponent,
    HomeComponent,
    WarehouseSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [ConfigService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
