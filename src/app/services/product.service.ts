import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpc   : HttpClient
  ) { }

  getProductServices(param : any){
    return this.httpc.get('https://fakestoreapi.com/products?limit='+param)
  }

  deleteProductServices(param : any) {
    return this.httpc.delete('https://fakestoreapi.com/products/'+param)
  }

  addProductServices(param : any) {
    return this.httpc.post('https://fakestoreapi.com/products', param)
  }

  updateProductServices(param : any, id : any) {
    return this.httpc.put('https://fakestoreapi.com/products/'+id, param)
  }
  
  getProductByIdService(param : any){
    return this.httpc.get('https://fakestoreapi.com/products/'+param)
  }

}
