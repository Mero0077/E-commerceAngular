import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";

@Component({
  selector: 'app-products-details',
  imports: [SpinnerComponent],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css'
})
export class ProductsDetailsComponent implements OnInit {
  loading: boolean = false;
  productDetails: any;
  constructor(private prodservice:ProductsService) { }

  ngOnInit(): void {
   this.loadProduct(this.prodservice.productIdDetails)
  }

loadProduct(id:number)
{
    this.loading = true;
 this.prodservice.getProductById(id).subscribe((data:any)=>{
    this.loading = false;
  this.productDetails = data; 
    console.log(data);
  },(error)=>{
    console.error('Error fetching product details:', error);
  });
}

}
