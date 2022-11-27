import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{

  constructor(public override httpClient: HttpClient) {
    /* Super */
	  super(httpClient);
  }

  /**
	 * @description Obtiene y descarga los datos del usuario
	*/
	public async getProfile(): Promise<any> {
		const result = await this.getMirror(`${environment.API_NETGRID}profile`);
		// Retorno la respuesta
		return result;
	}

  /**
	 * @description Recibe los datos y actualiza el usuario
	*/
	public async updateUser(data:any): Promise<Boolean> {
		const result = await this.putMirror(`${environment.API_NETGRID}user`,data);
		// Retorno la respuesta
		if (!result) {
      return false;
    }
		return true;
	}

}
