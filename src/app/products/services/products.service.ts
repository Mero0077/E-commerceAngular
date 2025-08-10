import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productIdDetails:number = 1;
 constructor(private http:HttpClient) { }

  getAllProducts() 
  {
    return this.http.get(environment.baseApi+'products');
  }

  getAllCategories()
  {
    return this.http.get(environment.baseApi+'products/categories');
  }

  getProductsByCategory(category:string)
  {
    return this.http.get(environment.baseApi+'products/category/'+category);
  }

  getProductById(id:number)
  {
    return this.http.get(environment.baseApi+'products/'+id);
  }
}
