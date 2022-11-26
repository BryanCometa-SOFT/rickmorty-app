import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide: any = "text"
  form: FormGroup = new FormGroup({
    name: new FormControl("" , [Validators.required]),
    email: new FormControl("" , [Validators.required]),
    password: new FormControl("", [Validators.required]),
    confirm_password: new FormControl("", [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  submitRegister(){
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

    if(form.password != form.confirm_password){
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        text: 'Las contraseñas no conciden',
      });
      return;
    }

    const formData:Register = {
      name: form.name,
      email: form.email,
      password: form.password
    }

    this.authService.registrer(formData).then(() => {
      Swal.fire({
        icon: 'success',
        text: 'Se registró exitoso',
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
