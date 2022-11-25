import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddFavorite } from '../interfaces/addFavorite';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService extends BaseService {

  urlBase: string = "Seleccion/";

  constructor(public override httpClient: HttpClient) {
    /* Super */
	super(httpClient);
  }

  	/**
	 * @description Obtiene y descarga el listado de episodios
	*/
	public async getAllFavorites(): Promise<any> {
		const result = await this.getMirror(`${this.urlBase}api/Favoritos`,1);
		// Retorno la respuesta
		return result;
	}

	/**
	 * @description agrega los episodios favoritos
	*/
	public async addFavorite(data:AddFavorite): Promise<any> {
		const result = await this.postMirror(`${this.urlBase}api/Favoritos`,1,data);
		
		// Retorno la respuesta
		return result;
	}
}
