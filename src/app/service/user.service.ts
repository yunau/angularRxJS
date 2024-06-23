import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    birthday: '',
    telephone: '',
    email: '',
  };

  private apiUrl = 'http://localhost:5254/api/users';

  //test data
  private userList: User[] = [
    {
      id: 1,
      firstName: 'John1',
      lastName: 'Angular1',
      birthday: '25/06/1982',
      telephone: '0403847581',
      email: 'test1.cooper@gmail.com',
    },
    {
      id: 2,
      firstName: 'John2',
      lastName: 'Angular2',
      birthday: '26/07/1983',
      telephone: '0403847582',
      email: 'test2.cooper@gmail.com',
    },
    {
      id: 3,
      firstName: 'John3',
      lastName: 'Angular3',
      birthday: '27/08/1984',
      telephone: '0403847583',
      email: 'test3.cooper@gmail.com',
    },
    {
      id: 4,
      firstName: 'John4',
      lastName: 'Angular4',
      birthday: '28/11/1985',
      telephone: '0403847584',
      email: 'test4.cooper@gmail.com',
    },
    {
      id: 5,
      firstName: 'John5',
      lastName: 'Angular5',
      birthday: '29/12/1986',
      telephone: '0403847585',
      email: 'test5.cooper@gmail.com',
    },
  ];

  dbrainStorage = window.localStorage;

  constructor(private http: HttpClient) {
    //use api to list data from database
    let user_data = this.dbrainStorage.getItem('table_user_registration') || '';
    if (user_data != '') {
      this.userList = JSON.parse(user_data);
    }
  }

  registerUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.apiUrl, user)
      .pipe(catchError(this.handleError));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      tap(users => console.log('Fetched users:', users)),
      map(users => users.filter(user => user.email)),
      tap(users => console.log('Filtered active users:', users)),
      map(users => users.sort((a, b) => a.firstName.localeCompare(b.firstName))),
      tap(users => console.log('Sorted users:', users)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }


  

  addUser(user: User) {
    this.userList.push(user);
    let user_data = JSON.stringify(this.userList);
    this.dbrainStorage.setItem('table_user_registration', user_data);
  }

  editUser(user: User) {
    if (this.userList.length > 0) {
      this.userList.forEach((userdb) => {
        if (user.id == user.id) {
          userdb = user;
          //use api to update database
          let user_data = JSON.stringify(this.userList);
          this.dbrainStorage.setItem('table_user_registration', user_data);
        }
      });
    }
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  listUsers(): User[] {
    return this.userList;
  }
}
