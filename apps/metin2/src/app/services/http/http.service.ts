import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountSend, User, CHPass } from '@metin2/api';
import { environment } from '@env/environment';
// Redux
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';

@Injectable()
export class HttpService {

  token: string;
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) {
    this.store.select('user').subscribe(({token}) => {
      this.token = token;
    })
  }

  private get_headers() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return httpOptions;
  }

  private get_headers_token(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return httpOptions;
  }

  private get(url: string) {
    return this.http.get(url);
  }

  private post(url: string, body: any) {
    const data = JSON.stringify(body);
    return this.http.post(url, data, this.get_headers());
  }

  get_guilds() {
    const url = `${this.baseUrl}/api/guild_rank/`;
    return this.get(url);
  }

  get_players() {
    const url = `${this.baseUrl}/api/player_rank/`;
    return this.get(url);
  }

  create_user(userForm: AccountSend) {
    const url = `${this.baseUrl}/api/signup/`;
    return this.post(url, userForm);
  }

  verify_user(username: string) {
    const url = `${this.baseUrl}/api/info/${username}`;
    return this.get(url);
  }

  login(LoginData: User) {
    const url = `${this.baseUrl}/api/token/`;
    const body = JSON.stringify(LoginData);
    return this.http.post(url, body, this.get_headers());
  }

  change_password(payload: CHPass) {
    const url = `${this.baseUrl}/api/change_pass/`;
    const body = JSON.stringify(payload);
    return this.http.post(url, body, this.get_headers_token(this.token));
  }

}
