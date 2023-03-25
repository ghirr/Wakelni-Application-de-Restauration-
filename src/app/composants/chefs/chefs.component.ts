import { Component, OnInit } from '@angular/core';
import { ChefsService } from 'src/app/services/chefs.service';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.css']
})
export class ChefsComponent implements OnInit {
  chefs:any=[]
  constructor(private chefservice:ChefsService) { }

  ngOnInit(): void {
    this.getchefs()
    console.log(this.chefs);
    
    
  }
getchefs(){
  this.chefservice.getAllchefs().subscribe((result) => {
    console.log("here", result.chefs);
    this.chefs = result.chefs
  })
}
}
