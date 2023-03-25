import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private Uservice:UserServiceService) { }
  connectedUser:String=''
  auth !: Subscription 
  ngOnInit(): void {
    let LS = JSON.parse(localStorage.getItem("connectedUser") || '{}')
    if (LS.role) {
      this.connectedUser = LS.role

    }

    this.auth = this.Uservice.serviceToHeader().subscribe((isAuth)=>{
      this.connectedUser =isAuth
    })
  }

}
