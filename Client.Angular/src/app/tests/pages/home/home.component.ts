import { Component } from '@angular/core';
import { Items } from '../../components/items/items';

@Component({
  selector: 'ttt-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [Items],
})
export class HomeComponent { }
