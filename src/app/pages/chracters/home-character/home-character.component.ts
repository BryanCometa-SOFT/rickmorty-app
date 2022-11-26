import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Chanracters } from 'src/app/interfaces/characters';
import { EStorageKeys } from 'src/app/interfaces/estorageKey';
import { StorageProvider } from 'src/app/providers/storage.provider';
import { CharacterService } from 'src/app/services/character.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-character',
  templateUrl: './home-character.component.html',
  styleUrls: ['./home-character.component.css']
})
export class HomeCharacterComponent implements OnInit {

  characters:Array<Chanracters> | null = [];
  page:number = 1;
  info:any = null;

  constructor(private characterService: CharacterService,private storage: StorageProvider,private router: Router) { }

  ngOnInit(): void {
    this.getAllCharacters();
  }

  /**
	* @description Controla la página siguiente de la lista de personajes
	*/
  nextCharacters(){
    if(this.info.next){
      this.page = this.page + 1;
      this.getAllCharacters();
    }else{
      Swal.fire({
        allowOutsideClick: false,
        icon: 'warning',
        text: 'No existen más personajes',
      });
    }
  }

  /**
	* @description Controla la página anterior de la lista de personajes
	*/
  prevCharacters(){
    if(this.info.prev){
      this.page = this.page - 1;
      this.getAllCharacters();
    }else{
      Swal.fire({
        allowOutsideClick: false,
        icon: 'warning',
        text: 'No existen más personajes',
      });
    }
  }

  /**
	* @description Obtiene y el listado de personajes y las url next y back
	*/
  getAllCharacters(): void{
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor',
    });
    this.characterService.getAllCharacters(this.page.toString()).then(resp=>{
      console.log(resp);
      this.characters = resp.results;
      this.info = resp.info;
      console.log(this.characters);
    }).catch(error=>{
      console.log(error);
    })
    Swal.close();
  }

  /**
	* @description agrega los personajes a favoritos
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
      id_caracter: id,
      observaciones: "N/A",
      usuario: dataUser?.e_MAIL,
    }

    this.characterService.addFavorite(data).then((resp)=>{
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

    /**
   * redirectUrl
   * @param router Parametro con la navegacion
   */
     redirectUrl(url: string) : void{
      console.log(url);
      this.router.navigate([url]);
    }
}
