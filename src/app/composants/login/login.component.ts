import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
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
  constructor(private uservice: UserServiceService, private router: Router,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    const snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.verticalPosition ='top';   // Positioning the snack bar 
  }
  login() {

    
    this.uservice.loginUser(this.user).subscribe((res)=>{
      this.snackbar.open(res.message,"Cancel",{duration:4000})
    })

  }
}
