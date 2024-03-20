import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/Books')
  }

  createBook(title: string, genre: string, price: number, published: Date, author_name:string, imageUrl: string) {
    return this.http.post('http://localhost:3000/api/Books/create', {title, genre, price, published, author_name, imageUrl })
  }
}
