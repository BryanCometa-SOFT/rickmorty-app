import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: any = "text"
  form: FormGroup = new FormGroup({
    email: new FormControl("" , [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  submitlogin(): void{
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

    const formData:Login = {
      email: form.email,
      password: form.password
    }

    this.authService.login(formData).then(resp => {
      Swal.fire({
        icon: 'success',
        text: 'Sesión iniciada correctamente',
        timer: 5000
      });
      this.router.navigate(["/home"]);
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
