import { Component } from '@angular/core';
import { BookService } from '../service/book.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  title: any
  genre: any
  author_name: any
  imageUrl: any
  price: any
  published: any



  constructor(private bookService: BookService, private toasterService: ToastrService) {
  }


  addBook() {
    return this.bookService.createBook(this.title, this.genre, this.author_name, this.price, this.published, this.imageUrl).subscribe((data) => {
      this.toasterService.success('Product added successfully!');
      this.clearForm()
    })
  }

  clearForm() {
    this.title = ''
    this.author_name = ''
    this.price = 0
    this.genre = ''
    this.published = new Date()

  }

}
