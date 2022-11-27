import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  public async getMirror(endpoint: string): Promise<any> {

    // Declaro la promesa
    return new Promise((resolve) => {

      // Genero la petición
      this.httpClient
        .get(endpoint, { headers: this.getHeaders() }).subscribe((response) => {
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
  public async postMirror(endpoint: string, data: any): Promise<any> {

    // Declaro la promesa
    return new Promise((resolve,reject) => {

      // Válido los parámetros
      if (!endpoint) { throw ('El parámetro endpoint es obligatorio'); }

      // Genero la petición
      this.httpClient
        .post(endpoint, data, { headers: this.getHeaders() })
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
        console.log(error.error);
        throw new Error(error);
      });
  }


  /**
	 * @description Método general para todas las peticiones PUT
	 */
	public async putMirror(endpoint: string, payload: any): Promise<any> {

		// Declaro la promesa
		return new Promise((resolve) => {

      // Válido los parámetros
      if (!endpoint) { throw ('El parámetro endpoint es obligatorio'); }

			// Genero la petición
			this.httpClient
				.put(endpoint, payload, { headers: this.getHeaders() })
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
	public async delMirror(endpoint: string): Promise<any> {

		// Declaro la promesa
		return new Promise((resolve) => {

      // Válido los parámetros
      if (!endpoint) { throw ('El parámetro endpoint es obligatorio'); }

			// Genero la petición
			this.httpClient
				.delete(endpoint, { headers: this.getHeaders() })
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
