import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-table-booked',
  templateUrl: './table-booked.component.html',
  styleUrls: ['./table-booked.component.css']
})
export class TableBookedComponent implements OnInit {
  tables:any=[]
  id:any
  constructor(private tableService:TableService,private router:Router, private confirmationDialogService: ConfirmationDialogService,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    const snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.verticalPosition ='top';   // Positioning the snack bar 
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
  this.confirmationDialogService
      .openConfirmationDialog('Confirmation', 'Voulez-vous vraiment supprimer cet élément ?')
      .subscribe((result) => {
        if (result) {
  this.tableService.deleteTable(id).subscribe((res)=>{
    this.snackbar.open(res.message,"Cancel",{duration:4000})
      console.log(res.message);
    this.getTableByUserId()
    
  })}})
}
editTable(id:any){
  this.router.navigate(['table/'+id])
}
}
