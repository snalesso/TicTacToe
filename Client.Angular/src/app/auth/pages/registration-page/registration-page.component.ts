import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegistrationFormComponent } from "../../components/registration-form/registration-form.component";

@Component({
  selector: 'ttt-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RegistrationFormComponent, RouterLink],
})
export class RegistrationPageComponent {

}
