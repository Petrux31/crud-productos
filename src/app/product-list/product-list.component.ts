import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  categories: string[] = ['PHONE', 'LAPTOP', 'TV']; // Categorías para filtrar
  selectedCategory: string = '';
  filteredProducts: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  // Obtener productos
  getProducts(): void {
    if (this.selectedCategory) {
      this.productService.getProductsByCategory(this.selectedCategory).subscribe((data) => {
        this.products = data;
      });
    } else {
      this.productService.getProducts().subscribe((data) => {
        this.products = data;
      });
    }
  }

  // Filtrar productos por categoría
  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement; // Especificamos que es un select
    if (target) {
      this.selectedCategory = target.value;  // Accedemos a la categoría seleccionada
      this.getProducts();
    }
  }

  deleteProduct(id: string): void {
    if (id) {
      this.productService.deleteProduct(id).subscribe(
        () => {
          console.log('Producto eliminado');
          this.getProducts();  // Vuelve a cargar la lista de productos después de eliminar
        },
        (error) => {
          console.error('Error al eliminar el producto', error);
        }
      );
    } else {
      console.error('ID no válido para eliminar');
    }
  }
}
