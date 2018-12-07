import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';
import { BookService } from '../service/book/book.service';
import { Author } from '../model/author';
import { AuthorService } from '../service/author/author.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];
  authors: Author[] = [];


  constructor(
    private bookService: BookService,
    private authorService: AuthorService
  ) { }

  ngOnInit() {
    this.getBooks();
    this.getAuthors();
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.books = books.slice(0, 4));
  }

  getAuthors(): void {
    this.authorService.getAuthors()
      .subscribe(authors => this.authors = authors.slice(0, 4));
  }

}
