import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AuthService } from '@metin2/api';

// Redux
import { Store } from '@ngrx/store'
import { AppState } from '@store';
import { ShowLoginModal, ShowProfileModal } from '@store/actions';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  online: string;

  constructor(
    public login: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(){
    this.online = 'Offline';
    setTimeout(() => {
      this.online = 'Online'
    }, 3000)
  }

  show_login_modal() {
    this.store.dispatch(ShowLoginModal({show: true}))
  }

  show_profile_modal() {
    this.store.dispatch(ShowProfileModal({show: true}))
    this.router.navigate(['/modal', {outlets: {'modal': ['main']}}])
  }
}
