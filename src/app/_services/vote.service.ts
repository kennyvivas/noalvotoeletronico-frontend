import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vote } from '../_models/vote';

@Injectable({ providedIn: 'root' })
export class VoteService {
    constructor(private http: HttpClient) { }

    sendVote(vote:Vote[]) {
        return this.http.post<Vote[]>(`${config.apiUrl}/api/polls/votes/add_vote/`,vote);
    }

}