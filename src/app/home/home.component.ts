import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User,Process,Project } from '@/_models';
import { UserService, AuthenticationService,ProcessService,ProjectService } from '@/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    currentUser: User;
    user: User;
    activeProcess: Process;
    process: Process;
    projects:Project[];

    constructor(
        private userService: UserService,
        private processService:ProcessService,
        private projectService:ProjectService,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.userService.getById(this.currentUser.id).subscribe(user => {
            this.user = user;
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
}