import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatSelectModule } from '@angular/material/select'
import { ActivatedRoute, Params, RouterModule } from '@angular/router'
import { EpisodesFromApi } from 'src/app/interfaces/episodes-from-api.interface'
import { SeasonsFromApi } from 'src/app/interfaces/seasons-from-api.interface'
import { Show } from 'src/app/interfaces/show.interface'
import { ShowsService } from 'src/app/services/shows.service'

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit {
  showId: number = -1
  show: Show | null = null
  seasons: SeasonsFromApi[] | null = null
  episodes: EpisodesFromApi[] | null = null
  selectedOption = new FormControl('Season 1')
  seasonId: number | null = null

  constructor(
    private route: ActivatedRoute,
    private apiService: ShowsService
  ) {}

  ngOnInit(): void {
    //shows
    this.route.params.subscribe((params: Params) => {
      this.showId = +params['id']
      this.apiService.fetchShowById(this.showId).subscribe((show: Show) => {
        this.show = show
      })
      //seasons
      this.apiService
        .fetchSeasons(this.showId)
        .subscribe((seasons: SeasonsFromApi[]) => {
          this.seasons = seasons
        })
    })
    //episodes
    this.selectedOption.valueChanges.subscribe((value) => {
      this.seasonId = Number(value)
      this.apiService
        .fetchEpisodes(this.seasonId, this.showId)
        .subscribe((episodes: EpisodesFromApi[]) => {
          this.episodes = episodes
        })
    })
  }
}
