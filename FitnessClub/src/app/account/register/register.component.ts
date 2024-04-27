import { ConfirmationService, MessageService } from "primeng/api";
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, catchError, finalize, of, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from "../../core/service/auth.service";
import { Register } from "../../core/models/register.model";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ConfirmationService, MessageService, AuthService]
})
export class RegisterComponent implements OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  profileForm: FormGroup;
  accountCreated = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService
  ) {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }
  onSubmit(): void {
    const firstName = this.profileForm.value.firstName;
    const lastName = this.profileForm.value.lastName;
    const email = this.profileForm.value.email;
    const password = this.profileForm.value.password;
    const user: Register = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    this.authService.registerUser(user)
      .pipe(
        catchError(error => of(error)),
        )
      .subscribe({
        next: () => this.emailSent(),
        error: (error) => console.log(error)
      });
    this.accountCreated = true;
  }
  emailSent() {
    this.confirmationService.confirm({
      message: 'Message on your email has been sent! Please confirm your email!',
      header: 'Email Verification',
      icon: 'pi pi-envelope',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Please', detail: 'Confirm your email' });
      }
    })
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
