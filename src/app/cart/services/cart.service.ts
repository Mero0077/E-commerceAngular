import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpclient:HttpClient) { }

  createNewCart(model:any) 
  {
    return this.httpclient.post(environment.baseApi + 'carts', model);
  }
}
