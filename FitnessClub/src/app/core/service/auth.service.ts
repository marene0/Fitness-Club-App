import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {StorageService} from "./storage.service";
import {SignInModel} from "../models/sign-in.model";
import {catchError, map} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import { Register} from "../models/register.model";
import {UserIdModel, UserRoleModel} from '../models/UserId.model';
import { Router } from '@angular/router';
import {TokenResponse} from "../models/TokenResponse.model";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userId: string | undefined;

  private readonly apiUrl: string = `${environment.apiIdentityAddress}/Authenticate`;
  private readonly apiUrlReg: string = `${environment.apiIdentityAddress}/Registration`;
  private  readonly apiNgrok: string = `${environment.apiNgrok}/Registration`;
  private  readonly apiApi: string = `${environment.apiAddress}/User`;
  constructor(private readonly httpClient: HttpClient,
              private readonly storageService: StorageService,
              private router: Router
              ) { }
  signIn(signInModel: SignInModel): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/login`, signInModel)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }
  signInApi(signInModel: SignInModel): Observable<any> {
    return this.httpClient.post<any>(`${this.apiApi}/ensure-created`, signInModel)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }
  public refreshToken(): Observable<TokenResponse> {
    const request = {
      accessToken: this.storageService.getToken(),
      refreshToken: this.storageService.getRefreshToken()
    };
    return this.httpClient.post<TokenResponse>(`${this.apiUrl}/refresh-token`, request);
  }
  registerUser(registerData: Register): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrlReg}/register`, registerData);
  }
  getUserId(): Observable<UserIdModel[]> {
    return this.httpClient.get<UserIdModel[]>(`${this.apiApi}/id`);
  }
getUserRole() {
  return this.httpClient.get<UserRoleModel>(`${this.apiApi}/userRole`);
}
  isAdmin(): Observable<boolean> {
    return this.getUserRole().pipe(
      map((userRole) => {
        return userRole.role === 'Admin';
      }),
      catchError((error) => {
        console.error('Error fetching user roles:', error);
        return of(false);
      })
    );
  }
}
