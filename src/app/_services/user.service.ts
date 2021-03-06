﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${config.apiUrl}/api/user/view/`);
    }

    isAdmin() {
        return this.http.get<boolean>(`${config.apiUrl}/api/user/role/`);
    }

   
}