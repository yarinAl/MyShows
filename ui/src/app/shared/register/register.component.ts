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

export interface RegisterDialogData {
  name: string
  email: string
  password: string
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: FormGroup
  @Output() optionClick = new EventEmitter<boolean>()

  constructor(
    private auth: AuthService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RegisterDialogData,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  register() {
    const user = this.form.value
    if (user.email && user.password && user.name) {
      this.auth.registerUser(user).subscribe({
        next: (res) => {
          console.log(res)
          localStorage.setItem('token', res.token)
        },
        error: (err) => console.log(err),
      })
    }
  }
  onNoClick(): void {
    this.dialogRef.close()
  }
  goToLogin() {
    this.optionClick.emit(false)
  }
}
