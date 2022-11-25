import { Component, OnInit } from '@angular/core';
import { AddFavorite } from 'src/app/interfaces/addFavorite';
import { Chanracters } from 'src/app/interfaces/characters';
import { EpisodeService } from 'src/app/services/episode.service';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  charactersFavorites:Array<Chanracters> | null = [];

  constructor(private favoriteService:FavoriteService,private episodeService: EpisodeService) { }

  ngOnInit(): void {
    this.getAllFavorites();
  }

  getAllFavorites(){
    this.favoriteService.getAllFavorites().then(resp=>{
      resp.forEach((element:any) => {
        this.getCharacters(element.id_caracter);
      });
    }).catch(error =>{
      console.log(error);
    })
  }

  /**
	* @description Obtiene y los datos de un personaje por episodio por id
	*/
  getCharacters(id:string): void{
    this.episodeService.getCharacters(id).then(resp=>{
      this.charactersFavorites?.push(resp);
    }).catch(error=>{
      console.log(error);
    })
  }

}
