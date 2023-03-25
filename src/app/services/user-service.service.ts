import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  user_url = "http://localhost:3000/api"
  authlist=new Subject <string> ()
  constructor(private httpClient: HttpClient,private router:Router) { }
  addUser(user: any) {
    return this.httpClient.post<{ message: any }>(`${this.user_url}/sign-up`, user)
  }
  loginUser(user:any){
    return this.httpClient.post<{ message: any, user: any }>(`${this.user_url}/login`, user).subscribe((res)=>{
      if (res.user) {
        localStorage.setItem("connectedUser", JSON.stringify(res.user))
        this.authlist.next(res.user.role)

        if (res.user.role==="admin") {
          this.router.navigate(['/admin'])
        } else {
          this.router.navigate(['/table'])

        }

      }
      
    })
    
  }
  serviceToHeader(){
    return this.authlist.asObservable()
  }


  logout(){ 
    this.router.navigate(['/login'])

    localStorage.removeItem("connectedUser")
    this.authlist.next("")
  }





  getUsers(){
   return this.httpClient.get<{data:any}>(`${this.user_url}/getUsers`) 
  }
 /*/ deleteuser(id:any){
    return this.httpClient.delete<{message:any}>(this.user_url+'/'+id)
  }*/
}
