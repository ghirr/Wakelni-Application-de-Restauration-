import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordStrengthValidator } from './password-strength.validators';
import { mustMatch } from './confirmPwd';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm!:FormGroup
  public showPasswordOnPress!: boolean;
  message:string=''
 
  constructor(private formBuilder: FormBuilder,private Uservice:UserServiceService,private router:Router) { }
  ngOnInit(): void {
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
      if(res.message=="1"){
      this.router.navigate(['/login'])}
      else{
        this.message="email already used"
      }
      

    })

  }

}
