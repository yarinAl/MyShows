import { AsyncPipe, CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'

import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatMenuModule } from '@angular/material/menu'
import { Router, RouterModule } from '@angular/router'
import { Observable, debounceTime, map, of, switchMap } from 'rxjs'
import { ShowSearch } from 'src/app/interfaces/show.interface'
import { AuthService } from 'src/app/services/auth.service'
import { ShowsService } from 'src/app/services/shows.service'
import {
  AutoCompleteComponent,
  AutoCompleteItem,
} from '../autocomplete/autocomplete.component'
import { DialogComponent } from '../dialog/dialog.component'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    AutoCompleteComponent,
    DialogComponent,
    MatDialogModule,
    MatMenuModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false
  autoCompleteItems$: Observable<AutoCompleteItem[]> | null = null
  searchText = new FormControl('')
  form: FormGroup

  constructor(
    protected auth: AuthService,
    private router: Router,
    private showService: ShowsService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }
  openDialog(): void {
    const user = this.form.value
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { email: user.email, password: user.passowrd },
      panelClass: ['dialog'],
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed')
    })
  }
  login() {
    const user = this.form.value
    if (user.email && user.password) {
      console.log(user)
    }
  }

  ngOnInit(): void {
    this.autoCompleteItems$ = this.searchText.valueChanges.pipe(
      debounceTime(200),
      switchMap((value) => {
        if (!value || value.length < 2) {
          return of([])
        }

        return this.showService.getSearchResults(value)
      }),
      map((shows: ShowSearch[]) =>
        shows.map((show) => ({
          id: `${show.id}`,
          title: show.name,
          image: show.image,
          info: `${show.rating} | ${show.language} | ${show.premiered}`,
        }))
      )
    )
  }

  onAutoCompleteOptionClick(item: AutoCompleteItem) {
    this.router.navigate([`/show/${item.id}`]).then((_) => {
      this.searchText.patchValue('')
    })
  }
}
