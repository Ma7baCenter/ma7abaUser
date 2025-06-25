import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'https://localhost:44380/api/Order'; 
  constructor(private http: HttpClient )   { }

  sendOrder(orderData: any) {
    return this.http.post(this.baseUrl, orderData);
    
  }
}
