import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router'
import { NgxStarRatingModule } from 'ngx-star-rating'
import { Subscription } from 'rxjs'
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
    NgxStarRatingModule,
  ],
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit, OnDestroy {
  showId: number = -1
  show: Show | null = null
  seasons: Season[] | null = null
  episodes: Episode[] | null = null
  selectedOption = new FormControl(1)
  seasonId: number | null = null
  private navigationEndSubscription: Subscription | undefined
  private paramsSubscription: Subscription | undefined

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ShowsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //shows
    this.paramsSubscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.showId = Number(params['id'])
        const seasonId = params['seasonId']
        this.selectedOption.patchValue(seasonId ? Number(seasonId) : 1)
        this.activatedRoute.data.subscribe((data: any) => {
          this.show = data.show.show
          this.seasons = data.show.seasons
          this.episodes = data.show.episodes
        })
      }
    )
    //episodes from dropdown selection
    this.selectedOption.valueChanges.subscribe((value) => {
      this.router.navigate([`show/${this.showId}/season/`, value], {})
    })
  }

  handleSeasonChange(seasonId: number) {
    this.apiService.getEpisodes(seasonId).subscribe((episodes: Episode[]) => {
      this.episodes = episodes
    })
  }

  ngOnDestroy(): void {
    this.navigationEndSubscription?.unsubscribe()
    this.paramsSubscription?.unsubscribe()
  }
}
