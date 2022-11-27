import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EStorageKeys } from 'src/app/interfaces/estorageKey';
import { StorageProvider } from 'src/app/providers/storage.provider';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  isLoged: boolean = false;
  /**
   * @Constructor
   * @param router Parametro con la navegacion
   */
  constructor(private router: Router, private storageProvider:StorageProvider, private authService:AuthService) { }

  ngOnInit(): void {
    this.isValidLoged();
  }

  /**
   * redirectUrl
   * @param router Parametro con la navegacion
   */
  redirectUrl(url: string) : void{
    this.isValidLoged();
    this.router.navigate([url]);
  }

  /**
	* @description Obtiene y los datos de un personaje por id
	*/
  logout(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor',
    });
    Swal.showLoading();

    this.authService.logout().then(resp => {
      Swal.fire({
        icon: 'success',
        text: 'Sesión cerrada correctamente',
        timer: 5000
      });
      this.isValidLoged();
      this.router.navigate(["/login"]);

    }).catch(error =>{
      console.log(error);
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        text: 'Hubo un problema, por favor intente más tarde',
        timer: 5000
      });
    })
    this.isValidLoged();
  }

  /**
	* @description Desabilita los botones del nav
	*/
  isValidLoged(){
    if(this.storageProvider.getItem(EStorageKeys.token)){
      this.isLoged = true;
    }else{
      this.isLoged = false;
    }
  }
}
