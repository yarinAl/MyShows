import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { Episode } from 'src/app/interfaces/show.interface'

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
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ episode }) => {
      this.episode = episode as Episode
    })
  }
}
