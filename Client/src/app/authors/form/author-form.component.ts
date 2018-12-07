import { Component, OnInit, Output } from '@angular/core';
import { Author } from '../../model/author';
import { AuthorService } from '../../service/author/author.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.css']
})
export class AuthorFormComponent implements OnInit {

  @Output() onStatusChanged = new EventEmitter<boolean>();

  author: Author = new Author('', '');

  constructor(
    private authorService: AuthorService
  ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    this.authorService.addAuthor(this.author)
      .subscribe(hero => this.changeStatus(true));
  }

  changeStatus(newStatus: boolean): void {
    this.onStatusChanged.emit(newStatus);
  }

}
