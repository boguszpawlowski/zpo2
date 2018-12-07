import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Author } from '../../model/author';

const HttpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const url = "http://localhost:8080/api/authors/";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(
    private http: HttpClient
  ) { }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(url)
      .pipe(
        tap((author: Author) => console.log(`fetched authors`)),
        catchError(this.handleError('getAuthors', []))
      )
  }

  addAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(url, author, HttpOptions)
      .pipe(
        tap((author: Author) => console.log(`added author /w id=${author.id}`)),
        catchError(this.handleError<Author>('addAuthor'))
      );
  }

  getAuthor(author: Author): Observable<Author>{
    let urlGet: string = `${url}/${author.id}`; 
    return this.http.get<Author>(urlGet,HttpOptions)
      .pipe(
        tap((author: Author) => console.log(`fetched author /w id=${author.id}`)),
        catchError(this.handleError<Author>('getAuthor'))
      );
  }


  deleteAuthor(author: Author): Observable<any> {
    let id = author.id;
    const urlDelete = `${url}/${id}`;

    return this.http.delete<Author>(urlDelete, HttpOptions)
      .pipe(
        tap(_ => console.log(`delete author /w id=${id}`)),
        catchError(this.handleError<Author>('deleteAuthor'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
