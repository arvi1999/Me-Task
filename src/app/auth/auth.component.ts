import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective } from '@angular/forms';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

interface TokenObj {
  token: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private apiService: ApiService,
              private cookieService: CookieService,
              private router: Router          
    ) { }

  ngOnInit(): void {
    const loginToken = this.cookieService.get('login_user_token');
    if(loginToken) {
      this.router.navigate(['/todo'])
    }
  }

  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  saveForm() {
    this.apiService.loginUser(this.authForm.value.username, this.authForm.value.password).subscribe(
      (token: TokenObj) => {
        this.cookieService.set("login_user_token", token.token);
        this.cookieService.set("login_user_name", this.authForm.value.username);
        this.router.navigate(['/todo']);
      },
      error => console.log(error)
    );
  }

}
