import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://cibertec-crud-users.onrender.com/api/v1/products';

  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Obtener un producto por ID
  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Actualizar un producto
  updateProduct(id: any, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, product);
  }

  // Método para eliminar un producto por ID
  deleteProduct(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);  // Realiza la solicitud DELETE con el ID
  }

  // Obtener productos por categoría
  getProductsByCategory(category: string): Observable<any[]> {
    const url = `${this.apiUrl}/category/${category}`;
    return this.http.get<any[]>(url);
  }

  // Método para agregar un nuevo producto
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

}
