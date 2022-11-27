/**
 * Modules
 **/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


/**
 * Interfaces
 **/
import { Login, Register } from '../interfaces/auth';
import { EStorageKeys } from '../interfaces/estorageKey';
import { StorageProvider } from '../providers/storage.provider';

/**
 * Services
 **/
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
	/**
	 * @Constructor
	 * @param router Parametro con la navegacion
	 */
	constructor(public override httpClient: HttpClient,private storage: StorageProvider) {
		/* Super */
		super(httpClient);
	}

  /**
	 * @description Recibe los datos y registra el usuario y guarda el token
	 * @param data Recibe la información del formulario de registro
	 * @return retorna un Promise<Boolean>
	*/
	public async registrer(data:Register): Promise<Boolean> {
		const result = await this.postMirror(`${environment.API_NETGRID}register`,data);

		//Guardo el token y datos del usuario
		this.storage.setItem(EStorageKeys.token, result['token'], false);
		this.storage.setItem(EStorageKeys.usuario, result['data']);

		// Retorno la respuesta
		if (!result) {
      return false;
    }
		return true;
	}

  /**
	 * @description Recibe los datos y loguea el usuario y guarda el token
	 * @param data Recibe la información del formulario de login
	 * @return retorna un Promise<Boolean>
	*/
	public async login(data:Login): Promise<Boolean> {
		const result = await this.postMirror(`${environment.API_NETGRID}login`,data);

    console.log("result")
    console.log(result)


		//Guardo el token y datos del usuario
		this.storage.setItem(EStorageKeys.token, result['token'], false);
		this.storage.setItem(EStorageKeys.usuario, result['data']);

		if (!result) {
      return false;
    }

    // Retorno la respuesta
		return result;
	}

  /**
	 * @description Realiza el logout del usuario
	 * @return retorna un Promise<Boolean>
	*/
  public async logout(): Promise<Boolean> {
		const result = await this.getMirror(`${environment.API_NETGRID}logout`);

		//Guardo el token y datos del usuario
    this.storage.removeItem(EStorageKeys.token);
    this.storage.removeItem(EStorageKeys.usuario);

		if (!result) {
      return false;
    }

    // Retorno la respuesta
		return result;
	}

  /**
	 * @description Verifica si el usuario está logueado
	*/
  public async isLoged() {
    return this.storage.getItem(EStorageKeys.token);
	}
}
