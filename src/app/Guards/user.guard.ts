import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if((state.url == '/login')||(state.url == '/signup'))
      {
       
        if(localStorage.getItem("connectedUser"))
        {
          this.router.navigate([''])
          return false 
        }

      }else
      {
        
        if(!localStorage.getItem('connectedUser'))
        {  
          
          this.router.navigate(['login'])
          return false 
        }

      }
      
      return true;

      
    }
  }
  
