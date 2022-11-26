import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { AddFavorite } from '../interfaces/addFavorite';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharacterService extends BaseService{

  constructor(public override httpClient: HttpClient) {
    /* Super */
	super(httpClient);
  }

  /**
	 * @description Obtiene y descarga todos los personajes según la página por id
	*/
	public async getAllCharacters(id:string): Promise<any> {
		const result = await this.getMirror(`${environment.API_RICKAN_DMORTY}character?page=${id}`);
		// Retorno la respuesta
		return result;
	}

	/**
	 * @description Obtiene y descarga los desatalles del personaje por id
	*/
	public async getCharactersDetail(id:string): Promise<any> {
		const result = await this.getMirror(`${environment.API_RICKAN_DMORTY}character/${id}`);
		// Retorno la respuesta
		return result;
	}

  /**
	 * @description Obtiene y descarga el listado de personajes
	*/
	public async getAllFavorites(): Promise<any> {
		const result = await this.getMirror(`${environment.API_NETGRID}favorite`);
		// Retorno la respuesta
		return result;
	}

  /**
	 * @description agrega los personajes favoritos
	*/
	public async addFavorite(data:AddFavorite): Promise<any> {
		const result = await this.postMirror(`${environment.API_NETGRID}favorite`,data);

		// Retorno la respuesta
		return result;
	}

}
