import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { RegistrationRequest } from '../../models/registration';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ttt-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField],
})
export class RegistrationFormComponent {

  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  protected readonly _formData = signal<RegistrationRequest>({
    username: '',
    password: ''
  }, {

  });

  protected readonly _form = form(this._formData, schemaPath => {
    required(schemaPath.username, { message: 'Username is required' });
    required(schemaPath.password, { message: 'Password is required' });
  });

  protected readonly _formErrors = computed(() => {
    const form = this._form();
    const errorSummaries = form.errorSummary();
    const x = errorSummaries.filter(e => e.formField?.state().dirty && !!e.message).map(e => e.message);
    return x;
    // const errorMessages: string[] = [];
    // for (const err of errors) {
    //   const fieldState = err.formField?.state();
    //   if (fieldState == null || !fieldState.dirty || !err.message)
    //     continue;
    //   errorMessages.push(err.message);
    // }
    // return errorMessages;
  });

  protected readonly _error = signal<string | null>(null);
  protected readonly _isSubmitting = signal(false);

  protected onSubmit(): void {
    if (this._form().invalid()) return;

    this._error.set(null);
    this._isSubmitting.set(true);

    this._authService.register(this._formData()).subscribe({
      next: () => this._router.navigate(['/game']),
      error: (err: { status?: number }) => {
        this._error.set(err?.status === 409
          ? 'Username is already taken.'
          : 'Unable to create account right now.');
        this._isSubmitting.set(false);
      }
    });
  }
}
