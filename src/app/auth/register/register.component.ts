import { Component, OnInit } from '@angular/core';
/**Servicio */
import { AuthService } from './../auth.service';
/**Modelo */
import { DATOS } from './../auth.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(
    private _authService : AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit(data:DATOS):void {
    this._authService.crearUsuario(data.name, data.email, data.password);
  }

}
