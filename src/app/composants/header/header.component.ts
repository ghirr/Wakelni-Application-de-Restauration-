import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
  logout() { 
    this.Uservice.logout();
  }

}
