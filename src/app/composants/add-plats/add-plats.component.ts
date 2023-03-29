import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatsService } from 'src/app/services/plats.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-plats',
  templateUrl: './add-plats.component.html',
  styleUrls: ['./add-plats.component.css']
})
export class AddPlatsComponent implements OnInit {
  platForm!:FormGroup
  titre:String=''
  id:any
  plat:any={}
  imagePreview:any
  button:any
  constructor(private platService:PlatsService,private AR:ActivatedRoute,private router:Router,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    const snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.verticalPosition ='top';   // Positionin
    this.id = this.AR.snapshot.paramMap.get("id")

    if (this.id) {
      this.titre = "Edit Plat"
      this.getPlatById()
      this.button="Edit"
    } else {
      this.titre = "ADD Plat"
      this.button="Add"
    }
  }

  onImageSelected(event: Event) {
    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.plat.image=file


    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
      
        }

  add_edit_plat(){
    if(this.id){
      this.platService.updatePlat(this.plat,this.id).subscribe((res) => {
        this.snackbar.open(res.message,"Cancel",{duration:4000})
        console.log(res.message);
        this.router.navigate(["admin/plats"])
      },(error)=>{
        this.snackbar.open(error.error.message,"Cancel",{duration:4000})
        console.log(error.error.message);}
      )
    }
    else{
    this.platService.addPlat(this.plat).subscribe((res) => {
      this.snackbar.open(res.message,"Cancel",{duration:4000})
      console.log(res.message);
      this.router.navigate(["admin/plats"])

    },(error)=>{
      this.snackbar.open(error.error.message,"Cancel",{duration:4000})
      console.log(error.error.message);}
    )}
  }
  getPlatById() {


    this.platService.getPlatById(this.id).subscribe((res) => {
      this.plat = res.plat
    })
  
  
  }
}
