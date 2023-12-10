import { Component, EventEmitter, Inject, Output } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { AuthService } from 'src/app/services/auth.service'
import { DialogComponent } from '../dialog/dialog.component'

export interface LoginDialogData {
  email: string
  password: string
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  // loggedIn: boolean = false
  form: FormGroup
  @Output() optionClick = new EventEmitter<boolean>()

  constructor(
    private auth: AuthService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginDialogData,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  login() {
    const user = this.form.value
    if (user.email && user.password) {
      this.auth.login(user).subscribe({
        next: (res) => {
          console.log('got res' + res)
          localStorage.setItem('token', res.token)
          // this.loggedIn = true
        },
        error: (err) => console.log(err),
      })
      this.dialogRef.close()
    }
  }
  onNoClick(): void {
    this.dialogRef.close()
  }
  goToRegister() {
    this.optionClick.emit(true)
  }
}
