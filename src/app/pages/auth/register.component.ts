import { Component, OnInit } from '@angular/core';
import { User, LoginService } from './login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './register.component.html',
  styleUrls: [
    '../app.component.css'
  ]
})

export class RegisterComponent {

  newUser: boolean;
  user: User;

  constructor(private router: Router, activatedRoute: ActivatedRoute, private service: LoginService) {
    this.user = { name: '', roles: ['user'], authdata: ''};
    this.newUser = true;
  }

  cancel() {
    window.history.back();
  }

  save() {
    this.service.saveUser(this.user).subscribe(
      _ => {},
      (error: Error) => console.error('Error creating new user: ' + error),
    );
    window.history.back();
  }


}
