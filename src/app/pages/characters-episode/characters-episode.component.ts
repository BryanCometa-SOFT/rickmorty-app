import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Chanracters } from 'src/app/interfaces/characters';
import { EStorageKeys } from 'src/app/interfaces/estorageKey';
import { TableModel } from 'src/app/interfaces/table';
import { StorageProvider } from 'src/app/providers/storage.provider';
import { EpisodeService } from 'src/app/services/episode.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-characters-episode',
  templateUrl: './characters-episode.component.html',
  styleUrls: ['./characters-episode.component.css']
})
export class CharactersEpisodeComponent implements OnInit {

  dataEpisode:TableModel|null = null;
  characters:Array<Chanracters> | null = [];

  constructor(private activatedRoute: ActivatedRoute, private episodeService: EpisodeService, private favoriteService:FavoriteService,private storage: StorageProvider) { }

  ngOnInit(): void {
    this.getAllEpisodes(this.activatedRoute.snapshot.params["id"]);
  }

  /**
	* @description Obtiene y descarga un episodio por id
	*/
  getAllEpisodes(id:string): void{
    this.episodeService.getEpisodes(id).then(resp=>{
      resp.characters.forEach((element: string) => {
        const id = element.replace("https://rickandmortyapi.com/api/character/","");
        this.getCharacters(id);
      });
    }).catch(error=>{
      console.log(error);
    })
  }

  /**
	* @description Obtiene y los datos de un personaje por episodio por id
	*/
  getCharacters(id:string): void{
    this.episodeService.getCharacters(id).then(resp=>{
      this.characters?.push(resp);
    }).catch(error=>{
      console.log(error);
    })
  }

  /**
	* @description agrega los episodios favoritos
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

    this.favoriteService.addFavorite(data).then((resp)=>{
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
