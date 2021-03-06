import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// importando interfaces
import { SignupService } from '@metin2/api';

// RXJS
import { Observable } from 'rxjs';

// Store
import { Store } from '@ngrx/store';
import { AppState } from '@store';
import { RegisterPlayer } from '@store/actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [`
  .ng-invalid.ng-touched:not(form) {
    border: 1px solid red;
  }
  `]
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  username: boolean;

  checkbox: boolean;

  constructor(
    public service: SignupService,
    private store: Store<AppState>
  ) {
    this.form = new FormGroup({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ], [ this.verifyUser.bind(this) ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      password_again: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      real_name: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ]),
      social_id: new FormControl('', [
        Validators.required,
        Validators.pattern('.{7,7}')
      ]),
      checkbox: new FormControl('', [
        Validators.required
      ])
    });
    this.form.reset();
   }

  ngOnInit() {
    this.store.select('register').subscribe(({success}) => {
      if(success){
        alert('Usuario registrado con exito.')
      }
    })
  }


  send() {
    const { login, password, real_name, email, social_id } = this.form.value;
    this.store.dispatch(RegisterPlayer({account: {
      login, password, real_name, email, social_id
    }}));
    this.form.reset();
  }

  verifyUser(control: FormControl): Promise<any> | Observable<any> {
    const usuario = control.value.toLowerCase();
    const promesa = new Promise(
      (resolve) => {
        this.checkUser(usuario);
        setTimeout( () => {
          if (this.username) {
            resolve({existe: true});
          } else {
            resolve( null );
          }
        }, 2000);
      }
    );
    return promesa;
  }

  checkUser(usuario: string) {
    this.service.check_user( usuario ).subscribe(
      (response: any) => {
        if (response.status) {
          this.username = true;
        } else {
          this.username = false;
        }
      },
      // Manejando el error
      () => {
      this.username = false;
    });
  }

}
