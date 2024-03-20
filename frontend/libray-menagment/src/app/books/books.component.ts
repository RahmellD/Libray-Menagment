import { Component, OnInit } from '@angular/core';
import { BookService } from '../service/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit {

  books: any[] = []

  constructor(private bookService: BookService, private router: Router) { }


  ngOnInit() {
    this.getBooks()
  }

  getBooks() {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data
    })
  }

  chunkArray(array: any[], chunkSize: number): any[] {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigateByUrl('/home')
  }

}
