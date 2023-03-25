import { Component, OnInit } from '@angular/core';
import { PlatsService } from 'src/app/services/plats.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  plats:any=[]

  constructor(private platservice:PlatsService) { }

  ngOnInit(): void {
    this.getPlats();

    
  }
  getPlats(){
    this.platservice.getAllplats().subscribe((result) => {
      this.plats = result.plats
    })

}



}
