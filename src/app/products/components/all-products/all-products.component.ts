import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { DecimalPipe } from '@angular/common';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";
import { SelectComponent } from "../../../shared/components/select/select.component";
import { ProductComponent } from "../product/product.component";
import { RouterLink } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-all-products',
  imports: [DecimalPipe, SpinnerComponent, SelectComponent, ProductComponent,RouterLink],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit {

  products: Product[] = [];
  categories: string[] = [];
  loading: boolean = false;
  cartProducts: any[] = [];

  constructor(private productsService: ProductsService) 
  {

  }
  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts();
  }


  getAllProducts() 
  {
    this.loading = true;
    this.productsService.getAllProducts().subscribe((data: any) => {
      this.products = data;
      this.loading = false;
      console.log(this.products);
    }, (error) => {
      this.loading = false;
      console.error('Error fetching products:', error);
    });
  }
  getAllCategories() 
  { 
    this.loading = true;
    this.productsService.getAllCategories().subscribe((data: any) => {
     this.categories = data;
        this.loading = false;
     console.log(this.categories);
    }, (error) => {
         this.loading = false;
      console.error('Error fetching categories:', error);
    });
  }

  // filterByCategory(event:any)
  // {
  //   let value = event.target.value;
  //   console.log(value);

  //   (value!='all')?this.getProductsByCategory(value):this.getAllProducts();
    
  // }

  filterByCategory(value: string) {
  console.log(value);

  value !== 'all'
    ? this.getProductsByCategory(value)
    : this.getAllProducts();
}


  getProductsByCategory(category: string) 
  {
    this.loading = true;
    this.productsService.getProductsByCategory(category).subscribe((data: any) => {
      this.products = data;
      this.loading = false;
      console.log(this.products);
    }, (error) => {
      this.loading = false;
      console.error('Error fetching products by category:', error);
    });
  }

addToCart(event: any) {
  let savedCart = localStorage.getItem("cart");

  if (!savedCart) {
    this.cartProducts = [event];
  } else {
    this.cartProducts = JSON.parse(savedCart);

    let exist = this.cartProducts.find(item => item.id === event.id);

    if (!exist) {
      this.cartProducts.push(event);
    } else {
      alert("Product already exists in cart");
    }
  }

  localStorage.setItem("cart", JSON.stringify(this.cartProducts));
}
}
