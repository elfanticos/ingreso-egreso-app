import { auth } from 'firebase';
import { Appstate } from './../../app.reducer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import { User } from 'src/app/auth/user.model';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {
  usuario:User = null;
  subscription:Subscription = new Subscription();
  constructor(
    private _store : Store<Appstate>
  ) { }

  ngOnInit():void {
    this.subscription = this._store.select('auth')
    .pipe(filter(fil => fil.user != null))
    .subscribe(auth => {
      this.usuario = auth.user;
    });
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

}
