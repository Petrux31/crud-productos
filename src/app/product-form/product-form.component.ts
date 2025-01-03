// product-form.component.ts
import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  product = {
    id: null,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSubmit(productForm: any): void {
    if (productForm.valid) {
      // Verificar si el id está presente y no es null ni undefined
      if (this.product.id) {
        // Si el id existe, llamamos a updateProduct
        this.productService.updateProduct(this.product.id, this.product).subscribe(
          (response) => {
            console.log('Producto actualizado:', response);
            this.router.navigate(['/products']);
          },
          (error) => {
            console.error('Error al actualizar el producto', error);
          }
        );
      } else {
        // Si no hay id, significa que estamos creando un nuevo producto
        this.productService.addProduct(this.product).subscribe(
          (response) => {
            console.log('Producto agregado:', response);
            this.router.navigate(['/products']);
          },
          (error) => {
            console.error('Error al agregar el producto', error);
          }
        );
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtener el id de la URL

    if (id) {
      this.productService.getProductById(id).subscribe(
        (productData) => {
          this.product = productData; // Asignar el producto recibido
          console.log('Producto cargado para edición:', this.product); // Verifica que el producto tiene id
        },
        (error) => {
          console.error('Error al obtener el producto:', error);
        }
      );
    } else {
      // Si no hay id, se puede asumir que se trata de un nuevo producto
      console.log('No se proporcionó un id para la edición, se está creando un nuevo producto.');
    }
  }

}
