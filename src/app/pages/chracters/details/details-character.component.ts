import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Chanracters } from 'src/app/interfaces/characters';
import { EStorageKeys } from 'src/app/interfaces/estorageKey';
import { StorageProvider } from 'src/app/providers/storage.provider';
import { CharacterService } from 'src/app/services/character.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-character',
  templateUrl: './details-character.component.html',
  styleUrls: ['./details-character.component.css']
})
export class DetailsCharacterComponent implements OnInit {

  characters:Array<Chanracters> | null = [];

  constructor(private activatedRoute: ActivatedRoute, private characterService: CharacterService,private storage: StorageProvider) { }

  ngOnInit(): void {
    this.getCharactersDetail(this.activatedRoute.snapshot.params["id"]);
  }

  /**
	* @description Obtiene y los datos de un personaje por id
	*/
  getCharactersDetail(id:string): void{
    this.characterService.getCharactersDetail(id).then(resp=>{
      this.characters?.push(resp);
    }).catch(error=>{
      console.log(error);
    })
  }

  /**
	* @description agrega los personajes favoritos
	*/
  addFavorite(id:number): void{
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor',
    });
    Swal.showLoading();
    const dataUser =  JSON.parse( this.storage.getItem(EStorageKeys.usuario)!);
    const data = {
      ref_api: id,
    }

    this.characterService.addFavorite(data).then(()=>{
      Swal.fire({
        icon: 'success',
        text: 'El personaje fue agregado correctamente a favoritos',
        timer: 5000
      });
    }).catch((error: any)=>{
      console.log(error);
      Swal.fire({
        icon: 'error',
        text: 'Este personaje ya fue registrado',
        timer: 5000
      });
    })
  }
}
