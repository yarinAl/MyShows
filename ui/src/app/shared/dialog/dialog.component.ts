import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { LoginComponent } from '../login/login.component'
import { RegisterComponent } from '../register/register.component'

@Component({
  standalone: true,
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  imports: [LoginComponent, RegisterComponent, CommonModule],
})
export class DialogComponent {
  choice: boolean
  constructor() {
    this.choice = false
  }

  toggle(choice: boolean) {
    this.choice = choice
  }
}
