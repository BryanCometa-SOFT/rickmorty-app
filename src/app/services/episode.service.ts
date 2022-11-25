import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService extends BaseService{

  constructor(public override httpClient: HttpClient) {
    /* Super */
	super(httpClient);
  }

  	/**
	 * @description Obtiene y descarga el listado de episodios
	*/
	public async getAllEpisodes(): Promise<any> {
		const result = await this.getMirror("episode",0);
		// Retorno la respuesta
		return result;
	}

	/**
	 * @description Obtiene y descarga un episodio por id
	*/
	public async getEpisodes(id:string): Promise<any> {
		const result = await this.getMirror("episode/"+id,0);
		// Retorno la respuesta
		return result;
	}

	/**
	 * @description Obtiene y descarga de personajes del episodio por id
	*/
	public async getCharacters(id:string): Promise<any> {
		const result = await this.getMirror("character/"+id,0);
		// Retorno la respuesta
		return result;
	}

}
