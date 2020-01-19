import { SingletonService } from './services/singleton.service';
import { Component } from '@angular/core';
import { CookieService } from './services/cookie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private singleton: SingletonService, 
    private cookie: CookieService) {
      this.singleton.loginKey = this.cookie.get(this.cookie.name);
    }
}
