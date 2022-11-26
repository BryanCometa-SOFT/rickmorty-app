import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { AddFavorite } from '../interfaces/addFavorite';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService extends BaseService{

  urlBase: string = "Seleccion/";

  constructor(public override httpClient: HttpClient) {
    /* Super */
	super(httpClient);
  }

  /**
	 * @description Obtiene y descarga todos los personajes según la página por id
	*/
	public async getAllCharacters(id:string): Promise<any> {
		const result = await this.getMirror("character?page="+id,0);
		// Retorno la respuesta
		return result;
	}

	/**
	 * @description Obtiene y descarga los desatalles del personaje por id
	*/
	public async getCharactersDetail(id:string): Promise<any> {
		const result = await this.getMirror("character/"+id,0);
		// Retorno la respuesta
		return result;
	}

  /**
	 * @description Obtiene y descarga el listado de personajes
	*/
	public async getAllFavorites(): Promise<any> {
		const result = await this.getMirror(`${this.urlBase}api/Favoritos`,1);
		// Retorno la respuesta
		return result;
	}

  /**
	 * @description agrega los personajes favoritos
	*/
	public async addFavorite(data:AddFavorite): Promise<any> {
		const result = await this.postMirror(`${this.urlBase}api/Favoritos`,1,data);

		// Retorno la respuesta
		return result;
	}

}
