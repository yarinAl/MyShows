import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router'
import { delay, filter, firstValueFrom } from 'rxjs'
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
  constructor(private showService: ShowsService) {}

  searchText = new FormControl('')
  counter = 0
  foundShows: Show[] = []
  ngOnInit(): void {
    this.searchText.valueChanges
      .pipe(
        filter((value) => !!value && value.length >= 2),
        delay(500)
      )
      .subscribe(async (value) => {
        if (value)
          this.foundShows = await firstValueFrom(
            this.showService.getSearchResults(value)
          )
        console.log(this.foundShows)
      })
  }
}
