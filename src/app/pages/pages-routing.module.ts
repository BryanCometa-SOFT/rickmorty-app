//Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { HomeComponent } from './home/home.component';

//Components
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CharactersEpisodeComponent } from './characters-episode/characters-episode.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'characters/:id', component: CharactersEpisodeComponent, canActivate: [AuthGuard] },
      { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: 'login' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
