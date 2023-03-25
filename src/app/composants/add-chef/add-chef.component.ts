import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChefsService } from 'src/app/services/chefs.service';

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
  constructor(private chefservice:ChefsService,private formBuilder:FormBuilder,private AR:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
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
    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.chef.image=file


    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
      
        }
  

  add_edit_chef(){
    if(this.id){
      this.chefservice.updateChef(this.chef).subscribe((res) => {
        console.log(res.message);
        this.router.navigate(["admin"])
      })

    }else{
    this.chefservice.addChef(this.chef).subscribe((res) => {
      console.log(res.message);
      this.router.navigate(["admin"])
    })
  }}

getChefById() {


  this.chefservice.getChefById(this.id).subscribe((res) => {
    this.chef = res.chef
  })


}


}