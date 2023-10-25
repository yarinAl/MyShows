import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router'
import { map } from 'rxjs'
import { Show } from 'src/app/interfaces/show.interface'
import { ShowsService } from '../../services/shows.service'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  shows: Show[] | null = null
  constructor(private apiService: ShowsService) {}

  ngOnInit(): void {
    this.apiService
      .getShows()
      .pipe(
        map((shows: Show[]) => {
          return shows.slice(0, 52)
        })
      )
      .subscribe((shows: Show[]) => {
        this.shows = shows
      })
  }
}
