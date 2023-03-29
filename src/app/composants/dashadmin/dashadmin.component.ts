import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChefsService } from 'src/app/services/chefs.service';


@Component({
  selector: 'app-dashadmin',
  templateUrl: './dashadmin.component.html',
  styleUrls: ['./dashadmin.component.css']
})
export class DashadminComponent implements OnInit {
activeTab = '';;
  constructor(private AR:ActivatedRoute) { }

  ngOnInit(): void {
    let url = this.AR.snapshot.url;
    console.log(url);
    
    if (url.length >= 2 && url[1].path) {
      switch (url[1].path) {
        case 'chefs':
          this.activeTab = 'chefs';
          break;
        case 'plats':
          this.activeTab = 'plats';
          break;
        case 'users':
          this.activeTab = 'users';
          break;
        case 'tables':
          this.activeTab = 'tables';
          break;
        default:
          this.activeTab = '';
      }
    }
  }





  

  

}
