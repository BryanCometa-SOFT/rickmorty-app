import { Component, OnInit } from '@angular/core';
import { Chanracters } from 'src/app/interfaces/characters';
import { CharacterService } from 'src/app/services/character.service';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-favorites-character',
  templateUrl: './favorites-character.component.html',
  styleUrls: ['./favorites-character.component.css']
})
export class FavoritesCharacterComponent implements OnInit {

  charactersFavorites:Array<Chanracters> | null = [];

  constructor(private favoriteService:FavoriteService,private characterService: CharacterService) { }

  ngOnInit(): void {
    this.getAllFavorites();
  }

  /**
	* @description Obtiene el listado de id favoritos para obtener los personajes.
	*/
  getAllFavorites(){
    this.favoriteService.getAllFavorites().then(resp=>{
      resp.forEach((element:any) => {
        this.getCharactersDetail(element.id_caracter);
      });
    }).catch(error =>{
      console.log(error);
    })
  }

  /**
	* @description Obtiene y los datos de un personaje por id
	*/
  getCharactersDetail(id:string): void{
    this.characterService.getCharactersDetail(id).then(resp=>{
      this.charactersFavorites?.push(resp);
    }).catch(error=>{
      console.log(error);
    })
  }

}
