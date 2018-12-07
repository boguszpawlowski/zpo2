import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../service/author/author.service';
import { Author } from '../../model/author';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  authors: Author[];

  constructor(
    private authorService: AuthorService
  ) { }

  ngOnInit() {
    this.getAuthors();
  }

  onDelete(author: Author): void {
    this.authorService.deleteAuthor(author)
      .subscribe(_ => this.getAuthors());
  }

  getAuthors(): void {
    this.authorService.getAuthors()
      .subscribe(authors => this.authors = authors);
  }

  childStatusChanged(newAuthor: boolean): void {
    this.getAuthors();
  }
}
