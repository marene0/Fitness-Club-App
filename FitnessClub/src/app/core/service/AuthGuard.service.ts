import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { catchError,  of } from 'rxjs';
import { AuthService } from './auth.service';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }
  result:boolean = false
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return !!this.authService.isAdmin()
      .pipe(
        untilDestroyed(this),
        catchError(err => of(err)),
      )
      .subscribe({
        next: user => {
          this.result = user;
          if (!this.result) {
            this.router.navigateByUrl('/account')
          }
        },
        error: () => {
          this.result = false
          this.router.navigateByUrl('/account')
        }
      });
  }
}

