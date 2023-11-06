import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { ActivatedRoute, Params, RouterModule } from '@angular/router'
import { Episode, Season, Show } from 'src/app/interfaces/show.interface'
import { ShowsService } from 'src/app/services/shows.service'

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit {
  showId: number = -1
  show: Show | null = null
  seasons: Season[] | null = null
  episodes: Episode[] | null = null
  selectedOption = new FormControl('Season 1')
  seasonId: number | null = null

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ShowsService
  ) {}

  ngOnInit(): void {
    //shows
    this.activatedRoute.params.subscribe((params: Params) => {
      this.showId = +params['id']
      this.activatedRoute.data.subscribe((data: any) => {
        this.show = data.show.show
        this.seasons = data.show.seasons
        this.episodes = data.show.episodes
      })
    })
    //episodes from dropdown selection
    this.selectedOption.valueChanges.subscribe((value) => {
      this.seasonId = Number(value)
      this.apiService
        .getEpisodes(this.seasonId)
        .subscribe((episodes: Episode[]) => {
          this.episodes = episodes
        })
    })
  }
}
