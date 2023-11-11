import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FooterComponent } from './shared/footer/footer.component'
import { HeaderComponent } from './shared/header/header.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent],
})
export class AppComponent {}
// https://www.tvmaze.com/api

// https://www.tvmaze.com/api?page=1
