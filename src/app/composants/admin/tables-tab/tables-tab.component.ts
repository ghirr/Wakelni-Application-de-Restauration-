import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-tables-tab',
  templateUrl: './tables-tab.component.html',
  styleUrls: ['./tables-tab.component.css']
})
export class TablesTabComponent implements OnInit {
  tables:any=[]
  constructor(private tableService:TableService, private confirmationDialogService: ConfirmationDialogService,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    const snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.verticalPosition ='top';   // Positioning the snack bar 
    this.getTables();
  }


  //Block tables
  getTables(){
    this.tableService.getTable().subscribe((result) => {
      console.log("here", result.tables);
      this.tables = result.tables
    })
  }
  deleteTables(id:any){
    this.confirmationDialogService
      .openConfirmationDialog('Confirmation', 'Voulez-vous vraiment supprimer cet élément ?')
      .subscribe((result) => {
        if (result) {
    this.tableService.deleteTable(id).subscribe((res)=>{
      this.snackbar.open(res.message,"Cancel",{duration:4000})
      console.log(res.message);
      this.getTables()
      
    })
  }})}

}
