import { Injectable } from '@angular/core';
import { EStorageKeys } from 'src/app/interfaces/estorageKey';

@Injectable({
    providedIn: 'root',
  })
  export class StorageProvider {
    constructor() {}
  
    /**
     * Agregar un item al storage
     * @param key - nombre de la clave
     * @param dataToSave - data a guardar
     * @param stringify - si se debe guardar serializado
     * @return retorna si el proceso fue correcto o con error
     */
    public setItem(key: EStorageKeys, dataToSave: any, stringify: boolean = true): void {
      localStorage.setItem(key, stringify ? JSON.stringify(dataToSave) : dataToSave);
    }
  
    /**
     * Obtener un item del storage
     * @param key - nombre de la clave
     * @return retorna si el proceso fue correcto o con error
     */
    public getItem(key: EStorageKeys): string | null {
      return localStorage.getItem(key);
    }
  
    /**
     * Eliminar un item del storage
     * @param key - nombre de la clave
     * @return retorna si el proceso fue correcto o con error
     */
    public removeItem(key: EStorageKeys): void {
      localStorage.removeItem(key);
    }
  }
  