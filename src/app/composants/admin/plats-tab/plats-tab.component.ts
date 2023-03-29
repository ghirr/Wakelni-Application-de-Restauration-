import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PlatsService } from 'src/app/services/plats.service';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
@Component({
  selector: 'app-plats-tab',
  templateUrl: './plats-tab.component.html',
  styleUrls: ['./plats-tab.component.css']
})
export class PlatsTabComponent implements OnInit {
   // Define the page size and current page number
   pageSize = 5;
   pageNumber = 1;
  constructor(private platService:PlatsService,private router:Router,private snackbar:MatSnackBar, private confirmationDialogService: ConfirmationDialogService) { }
  String ="plats"
  plats:any=[]
  ngOnInit(): void {
    const snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.verticalPosition ='top';   // Positioning the snack bar 
    this.getPlats();
  }
 

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
    this.confirmationDialogService
      .openConfirmationDialog('Confirmation', 'Voulez-vous vraiment supprimer cet élément ?')
      .subscribe((result) => {
        if (result) {
    this.platService.deleteplat(id).subscribe((res)=>{
      this.snackbar.open(res.message,"Cancel",{duration:4000})
      console.log(res.message);
      this.getPlats()
      
    })}})}
        


}
