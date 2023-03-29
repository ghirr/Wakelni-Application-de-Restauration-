import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordStrengthValidator } from './password-strength.validators';
import { mustMatch } from './confirmPwd';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm!:FormGroup
  public showPasswordOnPress!: boolean;
  message:string=''
 
  constructor(private formBuilder: FormBuilder,private Uservice:UserServiceService,private router:Router,private snackbar:MatSnackBar) { }
  ngOnInit(): void {
    const snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.verticalPosition ='top';   // Positioning the snack bar 
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.minLength(2), Validators.required]],
      lastName: ["", [Validators.minLength(2), Validators.required]],
      email: ["", [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(6), Validators.maxLength(12), Validators.compose([
        Validators.required, PasswordStrengthValidator])]],
      copassword: [""],
      
    },
      {
        validator: mustMatch("password","copassword")
      }

    )
  }
  signupUser(user:any){
    this.Uservice.addUser(user).subscribe((res) => {
      console.log(res.message);
        this.message=res.message
        if(res.message==='register succesfully'){
          this.snackbar.open('welcome '+user.firstName+' our new hero',"Cancel",{duration:4000})
        }
      })
      

    }

  }


