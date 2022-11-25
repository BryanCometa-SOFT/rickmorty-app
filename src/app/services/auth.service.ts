/**
 * Modules
 **/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
		const result = await this.postMirror("Seleccion/api/SOL/RegistroInicialSolicitante",1,data);

		//Guardo el token y datos del usuario
		this.storage.setItem(EStorageKeys.token, result['token'], false);
		this.storage.setItem(EStorageKeys.usuario, result['usuario']);

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
		const result = await this.postMirror("Security/api/SEG",1,data);

		//Guardo el token y datos del usuario
		this.storage.setItem(EStorageKeys.token, result['token'], false);
		this.storage.setItem(EStorageKeys.usuario, result['usuario']);

		if (!result) {
            return false;
        }
		// Retorno la respuesta
		return result;
	}
}
