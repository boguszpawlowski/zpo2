import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../../model/user';

const HttpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const url = 'http://localhost:8080/users/';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(url)
      .pipe(
        tap((user: User) => console.log(`fetched users`)),
        catchError(this.handleError('getUsers', []))
      );
  }


  getUser(id: number): Observable<User> {
    let urlGet: string = `${url}/${id}`;
    return this.http.get<User>(urlGet, HttpOptions)
      .pipe(
        tap((user: User) => console.log(`fetched user /w id=${user.id}`)),
        catchError(this.handleError<User>('getAuthor'))
      );
  }

  deleteUser(user: User): Observable<any> {
    let id = user.id;
    const urlDelete = `${url}/${id}`;

    return this.http.delete<User>(urlDelete, HttpOptions)
      .pipe(
        tap(_ => console.log(`deleted user /w id=${id}`)),
        catchError(this.handleError<User>('deleteUser'))
      );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(url, user, HttpOptions)
      .pipe(
        tap((user: User) => console.log(`added user /w id=${user.id}`)),
        catchError(this.handleError<User>('adduser'))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
