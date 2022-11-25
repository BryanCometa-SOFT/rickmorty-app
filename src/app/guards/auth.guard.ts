import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EStorageKeys } from '../interfaces/estorageKey';
import { StorageProvider } from '../providers/storage.provider';
import { FavoriteService } from '../services/favorite.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   * Constructor
   * @param storage Parametro con el almacenamiento local
   * @param navigate Parametro con la navegacion
   * @param favoriteService Parametro que injecta el service
   */
   constructor(private storage: StorageProvider, private router: Router, private favoriteService:FavoriteService) {}

   /**
    * CanActivate method
    * @return Retorna si es valida la navegacion
    */
   canActivate(
   ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     return this.isThereUser();
   }
 
   /**
    * Evaluar si hay un token en almacenamiento y la API favoritos 
    * @return Retorna una promesa
    */
   private async isThereUser(): Promise<boolean> {
     const token: string = (await this.storage.getItem(EStorageKeys.token)) || '';
     const dataFavorite = await this.favoriteService.getAllFavorites();
 
     if (!token || !dataFavorite) {
       this.router.navigate(['/login']);
       this.storage.removeItem(EStorageKeys.token);
       return false;
     }
     return true;
   }
}
 
  

