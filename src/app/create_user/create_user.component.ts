import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, catchError } from 'rxjs/operators';

import { AuthenticationService } from '@/_services';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({ templateUrl: 'create_user.component.html' })
export class CreateUserComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.createUser(this.f.username.value, this.f.password.value)
            .subscribe(
                data => {
                    this.authenticationService.login(this.f.username.value, this.f.password.value)
                        .pipe(first())
                        .subscribe(
                            data => {
                                this.router.navigate([this.returnUrl]);
                            });
                },
                error => {
                    this.error = error.text.email[0];
                    this.loading = false;
                });
    }
}
