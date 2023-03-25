import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatsService {
  platUrl = "http://localhost:3000/plat"
  constructor(private bostagi: HttpClient) { }
  addPlat(plat: any) {
    console.log("here into add plat", plat);

    const formData = new FormData()
    formData.append('image', plat.image)
    formData.append('name', plat.name)
    formData.append('categorie', plat.categorie)
    formData.append('description', plat.description)
    formData.append('price', plat.price)
    return this.bostagi.post<{ message: any }>(this.platUrl, formData)
  }

  getAllplats() {
    return this.bostagi.get<{ plats: any }>(this.platUrl)
  }
  deleteplat(id: any) {
    return this.bostagi.delete<{ message: any }>(`${this.platUrl}/${id}`)
  }
  getPlatById(id: any) {
    return this.bostagi.get<{ plat: any }>(this.platUrl + '/' + id)
  }
  updatePlat(plat: any) {
    console.log("here into edit plat", plat);
    return this.bostagi.put<{ message: any }>(this.platUrl, plat)
  }
}
