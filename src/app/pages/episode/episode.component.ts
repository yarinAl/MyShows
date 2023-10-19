import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { ActivatedRoute, Params, RouterModule } from '@angular/router'
import { Episode } from 'src/app/interfaces/show.interface'
import { ShowsService } from 'src/app/services/shows.service'

@Component({
  selector: 'app-episode',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss'],
})
export class EpisodeComponent {
  episodeId: number = -1
  episode: Episode | null = null
  constructor(
    private route: ActivatedRoute,
    private apisService: ShowsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.episodeId = +params['id']
      this.apisService
        .fetchEpisodeById(this.episodeId)
        .subscribe((episode: Episode) => {
          this.episode = episode
        })
    })
  }
}
