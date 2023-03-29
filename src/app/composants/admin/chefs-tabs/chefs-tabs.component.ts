import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ChefsService } from 'src/app/services/chefs.service';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';

@Component({
  selector: 'app-chefs-tabs',
  templateUrl: './chefs-tabs.component.html',
  styleUrls: ['./chefs-tabs.component.css']
})
export class ChefsTabsComponent implements OnInit {
  chefs:any=[]
  constructor(private chefService:ChefsService,private router:Router, private confirmationDialogService: ConfirmationDialogService,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    const snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.verticalPosition ='top';   // Positioning the snack bar 
    this.getChefs();
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
  this.confirmationDialogService
  .openConfirmationDialog('Confirmation', 'Voulez-vous vraiment supprimer cet élément ?')
  .subscribe((result) => {
    if (result) {
  this.chefService.deletechef(id).subscribe((res)=>{
    this.snackbar.open(res.message,"Cancel",{duration:4000})
    console.log(res.message);
    this.getChefs()
    
  })
}})}
}
