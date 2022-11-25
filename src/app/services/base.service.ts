import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EStorageKeys } from '../interfaces/estorageKey';
import { StorageProvider } from '../providers/storage.provider';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  /* Variables generales */
  public token: string = "";

  /**
	 * @Constructor
	 * @param httpClient permite las peticiones a la API
	 */
  constructor(public httpClient: HttpClient) { }


  /**
	 * @description Devuelve los headers para incluir en la petición
	 * @return retorna si el proceso fue correcto o con error {HttpHeaders}
	*/
	public getHeaders(): HttpHeaders {
    const storage = new StorageProvider();
		return new HttpHeaders().set('Authorization', `Bearer ${storage.getItem(EStorageKeys.token)}`);
	}

  /**
   * @description Método general para todas las peticiones GET
   */
  public async getMirror(endpoint: string, typeAPI: number): Promise<any> {

    // Declaro la promesa
    return new Promise((resolve) => {
      let url = "";

      // Creo la url
      if (typeAPI == 0) {
        url = `${environment.API_RICKAN_DMORTY}${endpoint}`;
      }
      if (typeAPI == 1) {
        url = `${environment.API_MIDASOFT}${endpoint}`;
      }

      // Genero la petición
      this.httpClient
        .get(url, { headers: this.getHeaders() }).subscribe((response) => {
          // Válido la respuesta
          if (!response) {
            throw (`Respuesta no valida: GET: getMirror: ${JSON.stringify(response)}`);
          }
          // Resuelvo la promesa con los datos de respuesta
          resolve(response);

        }, async (error) => {
          resolve(error.error);
        });

    }).catch(error => {
      // Imprimo el error
      console.error(error);
    });
  }

  /**
   * @description Método general para todas las peticiones POST
   */
  public async postMirror(endpoint: string, typeAPI: number, data: any): Promise<any> {

    // Declaro la promesa
    return new Promise((resolve,reject) => {
      let url = "";

      // Válido los parámetros
      if (!endpoint) { throw ('El parámetro endpoint es obligatorio'); }
      if (!typeAPI) { throw ('El tipo de API es obligatorio'); }

      // Creo la url
      if (typeAPI == 0) {
        url = `${environment.API_RICKAN_DMORTY}${endpoint}`;
      }
      if (typeAPI == 1) {
        url = `${environment.API_MIDASOFT}${endpoint}`;
      }

      // Genero la petición
      this.httpClient
        .post(url, data, { headers: this.getHeaders() })
        .subscribe((response) => {
          // Válido la respuesta
          if (!response) { throw (`Respuesta no valida: POST: postMirror: ${JSON.stringify(response)}`); }

          // Resuelvo la promesa con los datos de respuesta
          resolve(response);
        },
        (err) => {
          reject(err);
        })

      }).catch(error => {
        // Imprimo el error
        throw new Error("Personaje resgistrado");
      });
  }


  /**
	 * @description Método general para todas las peticiones PUT
	 */
	public async putMirror(endpoint: string, typeAPI: number, payload: any): Promise<any> {

		// Declaro la promesa
		return new Promise((resolve) => {
      let url = "";

      // Válido los parámetros
      if (!endpoint) { throw ('El parámetro endpoint es obligatorio'); }
      if (!typeAPI) { throw ('El tipo de API es obligatorio'); }

      // Creo la url
      if (typeAPI == 0) {
        url = `${environment.API_RICKAN_DMORTY}${endpoint}`;
      }
      if (typeAPI == 1) {
        url = `${environment.API_MIDASOFT}${endpoint}`;
      }

      // Creo el body
      const body = { endpoint, token: this.token, body: payload };

			// Genero la petición
			this.httpClient
				.put(url, body, { headers: this.getHeaders() })
				.subscribe((response) => {

					// Válido la respuesta
					if (!response) { throw(`Respuesta no valida: PUT: putMirror: ${JSON.stringify(response)}`); }

					// Resuelvo la promesa con los datos de respuesta
					resolve(response);
				});
		  }).catch(error => {

        // Imprimo el error
        console.error(error);
		});
	}

  /**
	 * @description Método general para todas las peticiones PUT
	 */
	public async delMirror(endpoint: string, typeAPI: number, payload: any): Promise<any> {

		// Declaro la promesa
		return new Promise((resolve) => {
      let url = "";

      // Válido los parámetros
      if (!endpoint) { throw ('El parámetro endpoint es obligatorio'); }
      if (!typeAPI) { throw ('El tipo de API es obligatorio'); }

      // Creo la url
      if (typeAPI == 0) {
        url = `${environment.API_RICKAN_DMORTY}${endpoint}`;
      }
      if (typeAPI == 1) {
        url = `${environment.API_MIDASOFT}${endpoint}`;
      }

			// Genero la petición
			this.httpClient
				.delete(url, { headers: this.getHeaders() })
				.subscribe((response) => {

					// Válido la respuesta
					if (!response) { throw(`Respuesta no valida: Delete: delMirror: ${JSON.stringify(response)}`); }

					// Resuelvo la promesa con los datos de respuesta
					resolve(response);
				});
		  }).catch(error => {
        console.error(error);
		});
	}  
}
