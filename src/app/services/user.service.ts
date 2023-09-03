import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, Subject, throwError, catchError, of} from 'rxjs';
import { User } from '../User';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class UserService{

  private apiUrl = 'http://localhost:5000/users';
  
  private currentUser: User | null =null;
  private readonly storeduser = 'currentUser';

  constructor(private http: HttpClient) { 
     const stored = sessionStorage.getItem(this.storeduser);
     if(stored){
      this.currentUser= JSON.parse(stored);
     }
  }

  addUser(newUser: User):Observable<User>{
    return this.http.post<User>(this.apiUrl,newUser,httpOptions);
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(username:string): Observable<User>{
    return this.getUsers().pipe(
      map((users: User[]) => {
        const user = users.find(u => u.username === username);
        if (user) {
          return user;
        } else {
          throw new Error('User not found');
        }
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  isUser(username: string):Observable <boolean>{
    return this.getUsers().pipe(
      map((users: User[]) => users.some(user => user.username === username))
    );
  }

   checkPass(user: User | null, password: string): Observable<boolean>{
    if(user!==null){
      return of(user.password===password);
    }
    else{
      return of(false);
    }
   }

  deleteCurrentUser():void{
    this.currentUser= null;
    sessionStorage.removeItem(this.storeduser);
  }

  setCurrentUser(user: User | null): void{
    this.currentUser = user;
    sessionStorage.setItem(this.storeduser, JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }


}
