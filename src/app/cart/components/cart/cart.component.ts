import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
constructor(private cartservice:CartService) { }
cartProducts: any[] = [];
TotalPrice: number = 0;
Tax: number = 12; 
  ngOnInit(): void {
    this.cartProducts = this.getCartProducts();
     console.log('Cart Products:', this.cartProducts);
  }


updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    // this.cartProducts = this.getCartProducts();
    console.log('Updated Cart Products:', this.cartProducts);
  }
  getCartProducts() 
  {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    }

    console.log('No products in cart');
  }

  getItemTopPrice(item: any): number 
  {
    console.log(item.price, item.quantity);
    if(!item.quantity) item.quantity = 1; 
    if(!item.price) item.price = 0;
    return item.price * item.quantity;
  }
  
  getCartTotalPrice(): number
  {
     this.TotalPrice=0;
     for (let item of this.cartProducts) 
      {
      this.TotalPrice += this.getItemTopPrice(item);
      }
      return this.TotalPrice;
  }
  GetCartTotalPriceWithTax(): number
  {
    return this.getCartTotalPrice() + this.Tax;
  }

  reduceQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCart();
    }
    
  }

  increaseQuantity(item: any) 
  {
    item.quantity++;
    this.updateCart();
  }

  detectChange() {
    this.updateCart();
  }

  removeFromCart(item: any) 
  {
    this.cartProducts = this.cartProducts.filter(cartItem => cartItem.id !== item.id);
    this.updateCart();
    console.log('Item removed from cart:', item);
  }
   
  clearCart() 
  {
    this.cartProducts = [];
    localStorage.removeItem('cart');
    this.updateCart();
    console.log('Cart cleared');
  }
 
  addCart()
  {
    if (this.cartProducts.length === 0) {
      console.log('No products in cart to add');
      return;
    }
    let products= this.cartProducts.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity
    }));

    let model=
    {
      userId:5,
      date: new Date(),
      products: products
    }
    this.cartservice.createNewCart(model).subscribe(
      response => {
        console.log('Cart created successfully:', response);
      },
      error => {
        console.error('Error creating cart:', error);
      }
    );
  }
}
  