import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router'
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
    // console.log('render')

    // this.activatedRoute.data.subscribe((data: any) => {
    //   console.log('data', data)
    // })

    // console.log(this.activatedRoute)

    // this.activatedRoute.firstChild?.data.subscribe((data: any) => {
    //   console.log('data', data)
    // })

    //seasons
    // this.navigationEndSubscription = this.router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd))
    //   .subscribe(() => {

    //   })

    //shows
    this.paramsSubscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        console.log('show', params)
        this.showId = Number(params['id'])
        const seasonId = params['seasonId']
        // console.log('ssssssssssssss', seasonId)
        this.selectedOption.patchValue(seasonId ? Number(seasonId) : 1)

        this.activatedRoute.data.subscribe((data: any) => {
          // console.log('data', data)

          this.show = data.show.show
          this.seasons = data.show.seasons
          this.episodes = data.show.episodes
        })
        // console.log(this.activatedRoute.snapshot.params)
        // if (this.activatedRoute.firstChild?.snapshot.params['seasonId']) {
        //   console.log('seasonId too!')

        //   this.handleSeasonChange(
        //     Number(this.activatedRoute.snapshot.firstChild?.params['seasonId'])
        //   )
        // }
      }
    )
    //episodes from dropdown selection
    this.selectedOption.valueChanges.subscribe((value) => {
      // console.log(3212312, value)
      this.router.navigate([`show/${this.showId}/season/`, value], {
        // relativeTo: this.activatedRoute,
        // replaceUrl: true,
      })
      // this.handleSeasonChange(Number(value))
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
