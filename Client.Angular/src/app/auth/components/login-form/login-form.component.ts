import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { LoginRequest } from '../../models/login';

@Component({
  selector: 'ttt-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField],
})
export class LoginFormComponent {

  protected readonly _formData = signal<LoginRequest>({
    username: '',
    password: ''
  });
  protected readonly _form = form(this._formData);

}
