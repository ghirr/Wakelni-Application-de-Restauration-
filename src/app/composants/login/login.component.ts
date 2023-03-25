import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public showPasswordOnPress!: boolean;
  user: any = {}
  loginForm !: FormGroup
  message: string = ""
  constructor(private uservice: UserServiceService, private router: Router) { }

  ngOnInit(): void {
  }
  login() {

    console.log("hereeeeeee login", this.user);
    this.uservice.loginUser(this.user)

  }
}
