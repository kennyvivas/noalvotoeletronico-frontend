import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import {DragDropModule,CdkDragDrop, moveItemInArray,CdkDropList} from '@angular/cdk/drag-drop';

import { User,Process,Project,Vote } from '@/_models';
import { UserService, AuthenticationService,ProcessService,ProjectService } from '@/_services';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VoteService } from '@/_services/vote.service';

@Component({ 
    templateUrl: 'home.component.html'
})

export class HomeComponent {
    currentUser: User;
    user: User;
    activeProcess: Process;
    process: Process;
    projects:Project[];
    loading = false;
    error="";

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder,
        private processService:ProcessService,
        private projectService:ProjectService,
        private voteService:VoteService,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
       
    }

  

    ngOnInit() {
        this.userService.getById(this.currentUser.id).subscribe(user => {
            this.user = user;
            
        });
        this.userService.isAdmin().subscribe(isadmin => {
            this.user.is_admin = isadmin; 
        });        
 

        this.processService.getActiveProcess().subscribe(process =>{
            this.activeProcess = process;
            if (process.id){
                this.projectService.getProjectList().subscribe(projects =>{
                    this.projects = projects;
                });
            }
        })
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.projects, event.previousIndex, event.currentIndex);
    }

    closeProcess(){
        this.processService.closeProcess().subscribe(
            data => {
               
            },
            error => {
                this.error = error;
                this.loading = false;
            });
    }

    vote() {
        let totalVotes = this.projects.length;
        let finalVote: Vote[] = [];

        this.projects.forEach(project => {
            let vote: Vote = {
                id: project.id,
                value : totalVotes
            };
            finalVote.push(vote);
            totalVotes-=1;
        });
        
        this.voteService.sendVote(finalVote)
            .pipe(first())
            .subscribe(
                data => {
                   
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });



    }

}