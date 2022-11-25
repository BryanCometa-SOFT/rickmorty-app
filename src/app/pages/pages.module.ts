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
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CharactersEpisodeComponent } from './characters-episode/characters-episode.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FavoritesComponent,
    CharactersEpisodeComponent
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
