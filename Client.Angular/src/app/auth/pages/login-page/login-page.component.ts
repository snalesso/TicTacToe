import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { LoginFormComponent } from "../../components/login-form/login-form.component";

@Component({
  selector: 'ttt-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoginFormComponent, RouterLink],
})
export class LoginPageComponent {
}
