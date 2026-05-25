import { Routes } from "@angular/router";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { RegistrationPageComponent } from "./pages/registration-page/registration-page.component";

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'registration',
    component: RegistrationPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  }
]