import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vienvenido a angular';
  curso:string = 'spring 5 con angular 7';
  profesor:string = 'andres guzman';
}
