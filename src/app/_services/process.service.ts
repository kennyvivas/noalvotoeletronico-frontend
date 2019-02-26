import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Process } from '../_models/process';

@Injectable({ providedIn: 'root' })
export class ProcessService {
    constructor(private http: HttpClient) { }

    getActiveProcess() {
        return this.http.get<Process>(`${config.apiUrl}/api/polls/process/get_active`);
    }

    closeProcess(){
        return this.http.get(`${config.apiUrl}/api/polls/process/finishProcess/`);
    }

}