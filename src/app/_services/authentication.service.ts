import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


import { User } from '@/_models';
import { LoginComponent } from '@/login';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    private errorHandler(errorResponse:HttpErrorResponse){
        

    }
    getRole(){
        return this.http.get<boolean>(`${config.apiUrl}/api/user/role/`);
    }


    login(username: string, password: string) {
        return this.http.post<any>(`${config.apiUrl}/api/user/login/`, { "email":username, "password":password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                this.getRole().subscribe(is_admin => {
                    user.is_admin = is_admin;
                });
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    createUser(username: string, password: string) {
        return this.http.post<any>(`${config.apiUrl}/api/user/create/`, { "email":username, "password":password })
        .pipe(map(user => {
            // User created. Return user
           return user;   
        }));

    }

}