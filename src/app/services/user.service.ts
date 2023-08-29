import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, BehaviorSubject, throwError, catchError, of} from 'rxjs';
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
  
  private currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUser.asObservable();

  constructor(private http: HttpClient) { 
    const storedUser = localStorage.getItem('currUser');
    this.currentUser = storedUser ? JSON.parse(storedUser) : null;
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
    this.currentUser.next(null);
    localStorage.removeItem('currUser');
  }

  setCurrentUser(user: User | null){
    this.currentUser.next(user);
  }

  getCurrentUser(): User | null {
    return this.currentUser.value;
  }


}
