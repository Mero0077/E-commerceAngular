import { DecimalPipe } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../product';

@Component({
  selector: 'app-product',
  imports: [DecimalPipe,FormsModule,RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
@Input() data!: Product;
@Output() item = new EventEmitter<any>();
addButton:boolean= false;
amount: number = 0;

constructor(private productservice:ProductsService) { }

updateProductId(id: number) {
 this.productservice.productIdDetails = id;
}

addToCart() {
  if (this.amount > 0) {
    this.item.emit({
      ...this.data,    
      quantity: this.amount
    });
    this.addButton = false;
    this.amount = 1;
  } else {
    alert("Please enter a valid quantity.");
  }
}

}
