import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const URL = '/api';

export interface User {
    id?: number;
    name: string;
    roles: string[];
    authdata: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLogged = false;
  isAdmin = false;
  user: User;
  auth: string;

  constructor(private http: HttpClient) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      this.setCurrentUser(user);
    }
  }

  logIn(user: string, pass: string) {
    console.log(user,pass);
    
    let auth = window.btoa(user + ':' + pass);
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + auth,
      'X-Requested-With': 'XMLHttpRequest',
    });
    return this.http.get<User>('/api/rest/login', { headers }).pipe(map(user => {
      if (user) {
        try {
          this.setCurrentUser(user);
        user.authdata = auth;
        localStorage.setItem('currentUser', JSON.stringify(user));
        } catch (error) {
          console.log('user:',user);
          
        }
       
      }
      return user;
    }));
  }

  logOut() {
    return this.http.get('/api/rest/logout').pipe(map(response => {
      this.removeCurrentUser();
      return response;
    }));
  }

  saveUser(user: User): Observable<User> {
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('authdata', user.authdata);
    return this.http.post<User>('/api/rest/register', formData);
  }

  private setCurrentUser(user: User) {
      this.isLogged = true;
      this.user = user;
      this.isAdmin = this.user.roles.indexOf('ROLE_ADMIN') !== -1;
  }

  removeCurrentUser() {
      localStorage.removeItem('currentUser');
      this.isLogged = false;
      this.isAdmin = false;
  }

}
