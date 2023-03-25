import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChefsService } from 'src/app/services/chefs.service';
import { PlatsService } from 'src/app/services/plats.service';
import { TableService } from 'src/app/services/table.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-dashadmin',
  templateUrl: './dashadmin.component.html',
  styleUrls: ['./dashadmin.component.css']
})
export class DashadminComponent implements OnInit {
  chefs:any=[]
  users:any=[]
  plats:any=[]
  tables:any=[]
  constructor(private chefService:ChefsService,private userService:UserServiceService,private platService:PlatsService,private router:Router,private tableService:TableService) { }

  ngOnInit(): void {
    this.getChefs();
    this.getTables();
    this.getUsers();
    this.getPlats();
    
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

  //Block plat
  getPlats(){
    this.platService.getAllplats().subscribe((result) => {
      this.plats=result.plats 
     })
  }
  editPlat(id:any){
    this.router.navigate(['add-plat/'+id])
  }
  deletePlat(id:any){
    this.platService.deleteplat(id).subscribe((res)=>{
      console.log(res.message);
      this.getPlats()
      
    })
  }



  //Block Chef
  getChefs(){
    this.chefService.getAllchefs().subscribe((result) => {
      console.log("here", result.chefs);
      this.chefs = result.chefs
    })
  }
  editChef(id:any){
    this.router.navigate(['add-chef/'+id])
  }
  deleteChef(id:any){
    this.chefService.deletechef(id).subscribe((res)=>{
      console.log(res.message);
      this.getChefs()
      
    })
  }

  //Block tables
  getTables(){
    this.tableService.getTable().subscribe((result) => {
      console.log("here", result.tables);
      this.tables = result.tables
    })
  }
  deleteTables(id:any){
    this.tableService.deleteTable(id).subscribe((res)=>{
      console.log(res.message);
      this.getTables()
      
    })
  }

}
