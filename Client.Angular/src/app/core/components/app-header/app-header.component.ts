import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'ttt-app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
  imports: [RouterLink],
})
export class AppHeaderComponent {
  // TODO: show API version in debug
  public readonly appName = 'Tic Tac Toe';
}
