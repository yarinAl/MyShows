import { AsyncPipe, CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { Router, RouterModule } from '@angular/router'
import { Observable, debounceTime, map, of, switchMap } from 'rxjs'
import { ShowSearch } from 'src/app/interfaces/show.interface'
import { ShowsService } from 'src/app/services/shows.service'
import {
  AutoCompleteComponent,
  AutoCompleteItem,
} from '../autocomplete/autocomplete.component'

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
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  autoCompleteItems$: Observable<AutoCompleteItem[]> | null = null
  searchText = new FormControl('')

  constructor(private showService: ShowsService, private router: Router) {}

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
