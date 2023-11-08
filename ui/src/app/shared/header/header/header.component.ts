import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router'
import { Observable, debounceTime, of, switchMap } from 'rxjs'
import { Show } from 'src/app/interfaces/show.interface'
import { ShowsService } from 'src/app/services/shows.service'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  foundShows$: Observable<Show[]> | undefined
  searchText = new FormControl('')

  constructor(private showService: ShowsService) {}

  ngOnInit(): void {
    this.foundShows$ = this.searchText.valueChanges.pipe(
      debounceTime(200),
      switchMap((value) => {
        if (!value || value.length < 2) {
          return of([])
        }

        return this.showService.getSearchResults(value)
      })
    )
  }
}
