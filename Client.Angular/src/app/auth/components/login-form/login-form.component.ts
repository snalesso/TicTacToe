import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/login';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ttt-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField],
})
export class LoginFormComponent {

  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  protected readonly _formData = signal<LoginRequest>({
    username: '',
    password: ''
  });
  protected readonly _form = form(this._formData);
  protected readonly _error = signal<string | null>(null);
  protected readonly _isSubmitting = signal(false);

  protected onSubmit(): void {
    if (this._form().invalid()) return;

    this._error.set(null);
    this._isSubmitting.set(true);

    this._authService.login(this._formData()).subscribe({
      next: () => this._router.navigate(['/game']),
      error: () => {
        this._error.set('Invalid username or password.');
        this._isSubmitting.set(false);
      }
    });
  }

}
