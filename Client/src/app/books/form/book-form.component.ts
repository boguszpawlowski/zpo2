import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { Book } from '../../model/book';
import { Author } from '../../model/author';
import { AuthorService } from '../../service/author/author.service'
import { BookService } from '../../service/book/book.service';


@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  @Input() selectedBook: Book;

  @Output() onStatusChanged = new EventEmitter<boolean>();

  authors: Author[];
  book: Book = new Book('', null, null, '');

  constructor(
    private authorService: AuthorService,
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors(): void {
    this.authorService.getAuthors()
      .subscribe(authors => {
        this.authors = authors;
        this.book.author = authors[0];
      });
  }

  onSubmit(): void {
    if(!this.book.id){
    this.bookService.addBook(this.book)
      .subscribe(book => this.changeStatus(true));
    }
    else{
      console.log(`upadating book /w id =${this.book.id}`)
    }
  }

  newBook(): void {
    this.book = new Book('', this.authors[0], null, '')
  }


  changeStatus(newStatus: boolean): void {
    this.onStatusChanged.emit(newStatus);
  }


  ngOnChanges(changes: SimpleChanges): void {
    let curVal = JSON.stringify(changes.selectedBook.currentValue);
    let prevVal = JSON.stringify(changes.selectedBook.previousValue);
    let changeLog = ` currentValue = ${curVal}, previousValue = ${prevVal}`;

    console.log(changeLog);
    if (!changes.selectedBook.isFirstChange()) {
      Object.assign(this.book, this.selectedBook);
    }
  }
}
