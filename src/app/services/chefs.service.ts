import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChefsService {
  chefUrl = "http://localhost:3000/chef"
  constructor(private bostagi: HttpClient) { }

  addChef(chef:any) {
    console.log("here into add chef",chef);

    const formData = new FormData()
    formData.append('image', chef.image)
    formData.append('firstName', chef.firstName)
    formData.append('lastName', chef.lastName)
    formData.append('description', chef.description)
    formData.append('numCin', chef.numCin)
    
    
    return this.bostagi.post<{message:any}>(this.chefUrl, formData)
    
  }
  getAllchefs(){
    return this.bostagi.get<{chefs:any}>(this.chefUrl)
    
  }
  deletechef(id:any){
    return this.bostagi.delete<{message:any}>(this.chefUrl+'/'+id)
  }
  getChefById(id:any){
    return this.bostagi.get<{chef:any}>(this.chefUrl + '/'+id )
  }
  updateChef(chef:any){
    console.log("here into add chef",chef);

   
    return this.bostagi.put<{message:any}>(this.chefUrl,chef)
  }
}
