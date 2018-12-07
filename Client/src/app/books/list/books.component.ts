import { Component, OnInit } from '@angular/core';
import { BookService } from '../../service/book/book.service';
import { Book } from '../../model/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {

  books: Book[];

  selectedBook: Book;

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.getBooks();
  }

  onDelete(book: Book): void{
    this.bookService.deleteBook(book)
    .subscribe(_=>this.getBooks());
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.books = books);
  }

  onStatusChanged(newStatus: boolean): void {
    this.getBooks(); 
  }

  onSelect(book: Book): void {
    this.selectedBook = book;
  }

}
