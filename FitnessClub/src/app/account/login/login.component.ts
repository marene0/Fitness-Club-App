import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {AuthService} from "../../core/service/auth.service";
import {Subject, switchMap, takeUntil} from "rxjs";
import {StorageService} from "../../core/service/storage.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  errorMessage: string = '';
  showSpinner: boolean = false;
  constructor(private readonly authService: AuthService,
              private readonly storageService: StorageService,
              private readonly router: Router) {
  }

  profileForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  public signInFormSumbit(): void {
    this.showSpinner = true;
    if (this.profileForm.invalid) {
      return;
    }

    const signInModel = {
      username: this.profileForm.controls.username.value,
      password: this.profileForm.controls.password.value
    };

    this.authService.signIn(signInModel)
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap(result => {
          this.storageService.setToken(result.token);
          this.storageService.setRefreshToken(result.refreshToken);
          return this.authService.signInApi(signInModel);
        })
      )
      .subscribe(
        (result) => {
          this.router.navigate(['/account']);
        },
        (error) => {
          console.error('Error signing in:', error);
          this.errorMessage = 'Invalid username or password. Please try again.';
        }
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
