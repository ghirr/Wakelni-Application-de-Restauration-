import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChefsService } from 'src/app/services/chefs.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-chef',
  templateUrl: './add-chef.component.html',
  styleUrls: ['./add-chef.component.css']
})
export class AddChefComponent implements OnInit {
  chefForm!:FormGroup
  chef:any={}
  imagePreview:any
  titre:String=''
  id:any
  button:any
  constructor(private chefservice:ChefsService,private formBuilder:FormBuilder,private AR:ActivatedRoute,private router:Router,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    const snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.verticalPosition ='top';   // Positioning the snack bar
    snackBarConfig.panelClass = ['my-snackbar-background'];
    this.id = this.AR.snapshot.paramMap.get("id")

    if (this.id) {
      this.titre = "Edit Chef"
      this.getChefById()
      this.button="Edit"
    } else {
      this.titre = "Add Chef"
      this.button="Add"

    }
  }
  
  onImageSelected(event: Event) {
    
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.chef.image = file;
  
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  

  add_edit_chef(){
    if(this.id){
      this.chefservice.updateChef(this.chef,this.id).subscribe((res) => {
        this.snackbar.open(res.message,"Cancel",{duration:4000})
        console.log(res.message);
        this.router.navigate(["admin/chefs"])
      },(error)=>{
        this.snackbar.open(error.error.message,"Cancel",{duration:4000})
        console.log(error.error.message);}
      )

    }else{
    this.chefservice.addChef(this.chef).subscribe((res) => {
      this.snackbar.open(res.message,"Cancel",{duration:4000})
      console.log(res.message);
      this.router.navigate(["admin/chefs"])
    },(error)=>{
      this.snackbar.open(error.error.message,"Cancel",{duration:4000})
      console.log(error.error.message);})
  }}

getChefById() {


  this.chefservice.getChefById(this.id).subscribe((res) => {
    this.chef = res.chef
  })


}


}