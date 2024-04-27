import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService} from "./service/auth.service";
import { StorageService} from "./service/storage.service";
import { TokenResponse} from "./models/TokenResponse.model";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private tokenRefreshSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storageService.getToken();
    if (token) {
      request = this.addTokenHeader(request, token);
    }
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }
  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.tokenRefreshSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((tokens: TokenResponse) => {
          this.isRefreshing = false;
          this.tokenRefreshSubject.next(tokens.accessToken);
          this.storageService.setToken(tokens.accessToken);
          this.storageService.setRefreshToken(tokens.refreshToken);
          return next.handle(this.addTokenHeader(request, tokens.accessToken));
        }),
        catchError((error) => {
          this.isRefreshing = false;
          return throwError(error);
        })
      );
    } else {
      return this.tokenRefreshSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap((token) => {
          return next.handle(this.addTokenHeader(request, token));
        })
      );
    }
  }
  private addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
