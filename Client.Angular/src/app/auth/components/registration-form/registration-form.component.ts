import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { RegistrationRequest } from '../../models/registration';

@Component({
  selector: 'ttt-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField],
})
export class RegistrationFormComponent {
  protected readonly _formData = signal<RegistrationRequest>({
    username: '',
    password: ''
  });
  protected readonly _form = form(this._formData);
}
