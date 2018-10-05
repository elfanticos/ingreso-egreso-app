import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    private _authService : AuthService
  ) { }

  ngOnInit() {
  }

  logout() {
    this._authService.logout();
  }
}
