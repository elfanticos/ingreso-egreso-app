import { Component, OnInit } from '@angular/core';
/**Servicio */
import { AuthService } from './../auth.service';
/**Modelo */
import { DATOS } from './../auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(
    private _authService : AuthService,
  ) { }
  //inicio
  ngOnInit() {
  }

  onLogin(data:DATOS) {
    console.log(data);
    this._authService.login(data.email,data.password);
  }



}
