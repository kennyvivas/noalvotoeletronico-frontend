import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../_models/project';

@Injectable({ providedIn: 'root' })
export class ProjectService {
    constructor(private http: HttpClient) { }

    getProjectList() {
        return this.http.get<Project[]>(`${config.apiUrl}/api/polls/projects/get_projects`);
    }

}