import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-table-booked',
  templateUrl: './table-booked.component.html',
  styleUrls: ['./table-booked.component.css']
})
export class TableBookedComponent implements OnInit {
  tables:any=[]
  id:any
  constructor(private tableService:TableService,private router:Router) { }

  ngOnInit(): void {
    let LS = JSON.parse(localStorage.getItem("connectedUser") || '{}')
    if (LS.role) {
      this.id=LS.id
      console.log(LS.id);
      console.log(this.id);
      
      
      this.getTableByUserId()
      console.log(this.tables);
      
    }
  }
  getTableByUserId(){
    this.tableService.getTablesByUserId(this.id).subscribe((result) => {
      console.log("here", result.table);
      this.tables = result.table
    })
  }
deleteTable(id:any){
  this.tableService.deleteTable(id).subscribe((res)=>{
    console.log(res.message);
    this.getTableByUserId()
    
  })
}
editTable(id:any){
  this.router.navigate(['table/'+id])
}
}
