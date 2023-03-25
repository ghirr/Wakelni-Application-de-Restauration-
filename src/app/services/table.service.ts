import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  tableUrl="http://localhost:3000/table"
  constructor(private lem3alem:HttpClient) { }

  addTable(table:any){
  return this.lem3alem.post<{message:any}>(this.tableUrl,table);
  }
  getTable(){
    return this.lem3alem.get<{tables:any}>(this.tableUrl)
  }
  deleteTable(id:any){
    return this.lem3alem.delete<{message:any}>(`${this.tableUrl}/${id}` )
  }
  getTableById(id:any){
    return this.lem3alem.get<{table:any}>(this.tableUrl+ '/'+id )
  }
  updateTable(table: any) {
    console.log("here into edit plat", table);
    return this.lem3alem.put<{ message: any }>(this.tableUrl, table)
  }
  getTablesByUserId(id:any){
   return this.lem3alem.get<{table:any}>(this.tableUrl + '/'+id+'/user' )
  }

}
