import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  hide: any = "text"
  form: FormGroup = new FormGroup({
    name: new FormControl("" , [Validators.required]),
    email: new FormControl("" , [Validators.required]),
    birthdate: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
  });

  constructor(private authService: AuthService,private userService: UserService , private router: Router) { }

  ngOnInit(): void {
    this.getProfile();
  }

  /**
	* @description Obtiene la data del usuario y la asigna
	*/
  getProfile(){
    this.userService.getProfile().then((resp) => {
      console.log(resp.data);
      this.form.patchValue(resp.data);
    }).catch(error =>{
      console.log(error);
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        text: 'Hubo un problema, por favor intente más tarde',
        timer: 5000
      });
    })
  }

  updateUser(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor',
    });
    Swal.showLoading();

    const form = this.form?.value;

    if(!this.form){
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        text: 'Todos los datos son obligatorios',
        timer: 5000
      });
      return;
    }

    //Formateo de fecha
    let date = new Date(form.birthdate)

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    const birthdate = year+"-"+month+"-"+day;

    const formData:any = {
      name: form.name,
      email: form.email,
      birthdate: birthdate,
      city: form.city,
    }

    this.userService.updateUser(formData).then(() => {
      Swal.fire({
        icon: 'success',
        text: 'Se registró exitoso',
        timer: 5000
      });
      this.getProfile();

    }).catch(error =>{
      console.log(error);
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        text: 'Hubo un problema, por favor intente más tarde',
        timer: 5000
      });
    })

  }
}
