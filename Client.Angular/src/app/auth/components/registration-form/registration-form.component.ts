import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
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
  }, {

  });

  protected readonly _form = form(this._formData, schemaPath => {
    required(schemaPath.username, { message: 'Username is required' });
    required(schemaPath.password, { message: 'Password is required' });
  });

  protected readonly _formErrors = computed(() => {
    const form = this._form();
    const errors = form.errors();
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
}
