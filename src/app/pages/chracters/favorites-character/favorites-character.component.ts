import { Component, OnInit } from '@angular/core';
import { Chanracters } from 'src/app/interfaces/characters';
import { CharacterService } from 'src/app/services/character.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favorites-character',
  templateUrl: './favorites-character.component.html',
  styleUrls: ['./favorites-character.component.css']
})
export class FavoritesCharacterComponent implements OnInit {

  charactersFavorites:Array<Chanracters> | null = [];

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.getAllFavorites();
  }

  /**
	* @description Obtiene el listado de id favoritos para obtener los personajes.
	*/
  getAllFavorites(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor',
    });
    Swal.showLoading();
    this.characterService.getAllFavorites().then(resp=>{
      resp.forEach((element:any) => {
        this.getCharactersDetail(element.id_caracter);
      });
    }).catch(error =>{
      console.log(error);
    })
    Swal.close();
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
