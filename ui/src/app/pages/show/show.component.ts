import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { NgxStarRatingModule } from 'ngx-star-rating'
import { Subscription } from 'rxjs'
import { Episode, Season, Show } from 'src/app/interfaces/show.interface'
import { ShowResolverData } from 'src/app/resolvers/show-resolver.service'
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
    this.activatedRoute.data.subscribe((data: any) => {
      const showResolverData: ShowResolverData = data.showResolverData
      this.show = showResolverData.show
      this.showId = showResolverData.show.id
      this.seasons = showResolverData.seasons
      this.episodes = showResolverData.episodes
      this.seasonId = showResolverData.seasonId

      if (this.seasonId) {
        this.selectedOption.patchValue(this.seasonId)
      }
    })

    //episodes from dropdown selection
    this.selectedOption.valueChanges.subscribe((value) => {
      console.log(value)
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
