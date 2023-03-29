import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.css']
})
export class UserTabComponent implements OnInit {
  users:any=[]
  constructor(private userService:UserServiceService) { }

  ngOnInit(): void {
    this.getUsers();

  }
 //Block user
 getUsers(){
  this.userService.getUsers().subscribe((result) => {
    this.users=result.data;
  })
}
/* deleteUser(id:any){
  this.userService.deleteuser(id).subscribe((res)=>{
    console.log(res.message);
    this.getUsers()
    
  })
}*/
}
