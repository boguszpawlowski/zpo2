import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Book } from '../../model/book';

const HttpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const url = 'http://localhost:8080/api/books/';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient
  ) { }


  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(url)
      .pipe(
        tap((book: Book) => console.log(`fetched books`)),
        catchError(this.handleError('getHeroes', []))
      )
  }


  getBook(id: number): Observable<Book>{
    let urlGet: string = `${url}/${id}`; 
    return this.http.get<Book>(urlGet,HttpOptions)
      .pipe(
        tap((book: Book) => console.log(`fetched book /w id=${book.id}`)),
        catchError(this.handleError<Book>('getAuthor'))
      );
  }

  deleteBook(book: Book): Observable<any> {
    let id = book.id;
    const urlDelete = `${url}/${id}`;

    return this.http.delete<Book>(urlDelete, HttpOptions)
      .pipe(
        tap(_ => console.log(`deleted book /w id=${id}`)),
        catchError(this.handleError<Book>('deleteBook'))
      );
  }

  addBook(book: Book): Observable<Book> {
    console.log(JSON.stringify(book));
    return this.http.post<Book>(url, book, HttpOptions)
      .pipe(
        tap((book: Book) => console.log(`added book /w id=${book.id}`)),
        catchError(this.handleError<Book>('addBook'))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
