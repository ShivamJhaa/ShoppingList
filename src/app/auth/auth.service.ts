import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn:'root'
})
export class AuthService{
    user = new Subject<User>();

    constructor( private http: HttpClient){}

    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>
        ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBaBNfvy75ixkW2RilZMFIzXTGFsTghtaA',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthetication(resData.email,resData.localId,resData.idToken, +resData.expiresIn);
        }));
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBaBNfvy75ixkW2RilZMFIzXTGFsTghtaA',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthetication(resData.email,resData.localId,resData.idToken, +resData.expiresIn);
        }));
    }

    private handleError(errorResponse: HttpErrorResponse){
        let errorMeassge = 'An unkown error occured';
            if(!errorResponse.error || !errorResponse.error.error){
                return throwError(errorMeassge);
            }
            switch(errorResponse.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMeassge = 'This Email already exits';
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMeassge = 'Email or Password do not match'
                    break;
                case 'INVALID_PASSWORD':
                    errorMeassge = 'Email or Password do not match'
                    break;
            }
            return throwError(errorMeassge);
    }

    private handleAuthetication (
        email: string,
        userID: string,
        token: string,
        expiresIn: number
    ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userID, token, expirationDate);
        this.user.next(user);
    }

}