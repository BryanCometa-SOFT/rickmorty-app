/**
 * Modules
 **/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';

/**
 * Routing
 **/
import { PagesRoutingModule } from './pages-routing.module';

/**
 * Material
 **/
import { MaterialModule } from '../material/material.module';

/**
 * Components
 **/
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FavoritesCharacterComponent } from './chracters/favorites-character/favorites-character.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsCharacterComponent } from './chracters/details/details-character.component';
import { HomeCharacterComponent } from './chracters/home-character/home-character.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    FavoritesCharacterComponent,
    DetailsCharacterComponent,
    HomeCharacterComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
